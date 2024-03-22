export interface Reservation {
  userId: string
  hotelId: string
  roomId: string
  startDate: string
  price: number
  formValues: {
    [key: string]: string
  }
}
