import { COLLECTIONS } from '@constants'
import { Like } from '@models/like'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
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
