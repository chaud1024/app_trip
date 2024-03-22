import useReservations from '@components/reservation-list/hooks/useReservations'
import ListRow from '@shared/ListRow'

const ReservationListPage = () => {
  const { data, isLoading } = useReservations()

  if (data == null || isLoading === true) {
    return null
  }

  console.log('data', data)

  return (
    <div>
      {data.map(({ hotel, reservation }) => (
        <ListRow
          key={reservation.id}
          left={
            <img
              src={hotel.mainImageUrl}
              alt={`${hotel.name} 의 이미지`}
              width={80}
              height={80}
            />
          }
          contents={
            <ListRow.Texts
              title={hotel.name}
              subTitle={`${reservation.startDate} ~ ${reservation.endDate} (${reservation.nights})박`}
            />
          }
        />
      ))}
    </div>
  )
}

export default ReservationListPage
