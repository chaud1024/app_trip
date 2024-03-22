import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTIONS } from '@constants'
import { Reservation } from '@models/reservation'
import { Room } from '@models/room'
import { getHotel } from './hotel'

// 예약 만들기
export async function makeReservation(newReservation: Reservation) {
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )

  const room = roomSnapshot.data() as Room
  const 현재잔여객실수 = room.avaliableCount

  if (현재잔여객실수 === 0) {
    throw new Error('no room')
  }

  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      avaliableCount: Number(현재잔여객실수) - 1,
    }),

    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}

// 예약 목록 가져오기
export async function getReservations({ userId }: { userId: string }) {
  const reservationQuery = query(
    collection(store, COLLECTIONS.RESERVATION),
    where('userId', '==', userId),
  )

  const reservationSnapshot = await getDocs(reservationQuery)

  const result = []

  for (const reservationDoc of reservationSnapshot.docs) {
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    }

    const hotel = await getHotel(reservation.hotelId)

    result.push({ reservation, hotel })
  }

  return result
}
