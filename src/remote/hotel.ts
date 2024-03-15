import {
  collection,
  limit,
  query,
  QuerySnapshot,
  startAfter,
  getDocs,
} from 'firebase/firestore'

import { COLLECTIONS } from '@/constants'
import { store } from './firebase'

export default async function getHotels(pageParams?: QuerySnapshot<unknown>) {
  const hotelsQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        )
  const hotelsSnapshot = await getDocs(hotelsQuery)

  const items = hotelsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  return { items, lastVisible }
}
