import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTIONS } from '@constants'
import { Review } from '@models/review'
import { User } from '@models/user'

export async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)
  const reviewQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc'),
  )

  // 리뷰 문서 가져오기
  const reviewSnapshot = await getDocs(reviewQuery)

  // 리뷰 정의
  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review
  })

  // 유저 캐시하기: 유저가 리뷰를 2개 이상 작성했을 때 유저 정보를 2번 이상 호출할 필요 없으므로
  const userMap: {
    [key: string]: User
  } = {}

  const results: Array<Review & { user: User }> = []

  for (let review of reviews) {
    const 캐시된유저 = userMap[review.userId]

    if (캐시된유저 == null) {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId),
      )

      const user = userSnapshot.data() as User

      // userMap에 캐싱된 user를 사용하게끔
      userMap[review.userId] = user
      results.push({
        ...review,
        user,
      })
    } else {
      results.push({
        ...review,
        user: 캐시된유저,
      })
    }
  }

  return results
}

// 리뷰 작성
// 새로 작성하는 review데이터는 생성되면 id가 생기기 때문에 Review 모델에서 id를 제외
export function writeReview(review: Omit<Review, 'id'>) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, review.hotelId)
  const reviewRef = doc(collection(hotelRef, COLLECTIONS.REVIEW))

  // 리뷰가 작성되는 hotelRef를 먼저 찾고, 그 하위 컬렉션으로써 reviewRef를 만든다
  // 그리고 그 reviewRef위치에 review데이터를 넣어 setDoc(저장)한다
  return setDoc(reviewRef, review)
}
