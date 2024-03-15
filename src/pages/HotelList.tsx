import useHotels from '@components/hotelList/hooks/useHotels'
import Hotel from '@components/hotelList/Hotel'
import Spacing from '@components/shared/Spacing'
import Top from '@components/shared/Top'
import { Fragment } from 'react'

const HotelList = () => {
  const { data: hotels } = useHotels()

  console.log('hotels', hotels)
  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가" />

      {hotels?.map((hotel, idx) => (
        <Fragment key={hotel.id}>
          <Hotel hotel={hotel} />
          {hotels.length - 1 === idx ? null : (
            <Spacing
              size={8}
              backgroundColor="gray100"
              style={{ margin: '20px 0' }}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default HotelList
