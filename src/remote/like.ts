import { COLLECTIONS } from '@constants'
import { Hotel } from '@models/hotel'
import { Like } from '@models/like'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { store } from './firebase'

export async function getLikes({ userId }: { userId: string }) {
  const likeSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      orderBy('order', 'asc'),
    ),
  )

  return likeSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

export async function toggleLike({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>
  userId: string
}) {
  // 이미 저장되어 있는 호텔인지 찾아보기
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id),
    ),
  )

  // 이미 저장되어 있다 => 삭제
  if (findSnapshot.docs.length > 0) {
    const removeTarget = findSnapshot.docs[0]
    const removeTargetOrder = removeTarget.data().order

    // 삭제하고자하는 아이템의 order보다 큰 아이템들의 배열
    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    )

    if (updateTargetSnapshot.empty) {
      // 삭제하고자하는 아이템의 order보다 큰 아이템의 배열이 비어있다? => 바로 삭제
      // (삭제하고자하는 아이템의 order가 마지막이었음)
      return deleteDoc(removeTarget.ref)
    } else {
      const batch = writeBatch(store)

      // 삭제하고자하는 아이템의 order보다 큰 아이템의 배열을 순회하며 해당 아이템 ref의 order를 1씩 줄임
      updateTargetSnapshot.forEach((doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 })
      })

      await batch.commit()

      return deleteDoc(removeTarget.ref)
    }
  } else {
    // 저장되어있지 않다 => 생성

    // 저장된 아이템 중에서 마지막 아이템 찾기: order를 알기 위해
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1),
      ),
    )

    // 마지막 인덱스
    // 인덱스가 0(저장된 거 없음)? 0 : lastLikeSnapshot의 문서 데이터의 order
    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order

    // 새롭게 저장한 아이템
    const newLike = {
      order: lastOrder + 1,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      userId,
    }

    // 아이템을 firebase 문서에 저장
    return setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike)
  }
}
