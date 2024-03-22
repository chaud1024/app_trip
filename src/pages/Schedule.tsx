import RangePicker from '@shared/RangePicker'
import qs from 'qs'
import { useEffect, useState } from 'react'

const SchedulePage = () => {
  const { roomId = '', hotelId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    roomId: string
    hotelId: string
  }

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    night: number
  }>({
    startDate: undefined,
    endDate: undefined,
    night: 0,
  })

  useEffect(() => {
    if (roomId === '' || hotelId === '') {
      window.history.back()
    }
  }, [roomId, hotelId])

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            night: dateRange.night,
          })
        }}
      />
    </div>
  )
}

export default SchedulePage
