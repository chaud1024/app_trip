import useHotels from '@components/hotelList/hooks/useHotels'

const HotelList = () => {
  const { data: hotels } = useHotels()

  console.log('hotels', hotels)
  return <div>HotelList</div>
}

export default HotelList
