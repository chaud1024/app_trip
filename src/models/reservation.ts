export interface Reservation {
  userId: string
  hotelId: string
  roomId: string
  startDate: string
  endDate: string
  nights: number
  price: number
  formValues: {
    [key: string]: string
  }
}
