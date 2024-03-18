import { HOTEL } from '@/mock/data'
import { doc, getDocs, collection } from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTIONS } from '@constants'
import { Room } from '@models/room'

export async function getRooms(hotelId: string) {
  const roomSnapshot = await getDocs(
    collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
  )

  return roomSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
