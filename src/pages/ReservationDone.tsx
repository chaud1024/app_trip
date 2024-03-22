import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

const ReservationDonePage = () => {
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName: string
  }
  const navigate = useNavigate()

  return (
    <div>
      <Spacing size={60} />
      <Flex direction="column" align="center">
        <img
          src="https://cdn0.iconfinder.com/data/icons/business-1680/24/Flight_Aircraft_Airline_Airplane_Plane_Fly-_20-512.png"
          alt=""
          width={120}
          height={120}
        />
        <Spacing size={30} />
        <Text bold={true} typography="t4">
          {hotelName.replaceAll('_', ' ')}
        </Text>
        <Spacing size={8} />
        <Text>예약이 완료되었습니다.</Text>
      </Flex>

      <Spacing size={60} />

      <div style={{ padding: 24 }}>
        <Button.Group>
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/reservation/list')}>
            예약 리스트로
          </Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default ReservationDonePage
