import { collection, doc, getDocs } from 'firebase/firestore'

import { COLLECTIONS } from '@constants'
import { Room } from '@models/room'
import { store } from './firebase'

export async function getRooms(hotelId: string) {
  const roomSnapshot = await getDocs(
    collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
  )

  return roomSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
