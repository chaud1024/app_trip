import { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import useRecommendHotels from '@components/hotel/hook/useRecommendHotels'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import Button from '@shared/Button'
import addDelimiter from '@utils/addDelimiter'

const RecommendHotels = ({
  recommendHotels,
}: {
  recommendHotels: string[]
}) => {
  const { data, isLoading } = useRecommendHotels({ hotelIds: recommendHotels })
  const [showMore, setSetshowMore] = useState(false)

  if (data == null || isLoading) {
    return null
  }

  const 호텔리스트 = data.length < 3 || showMore ? data : data.slice(0, 3)

  return (
    <Container>
      <Text typography="t4" bold={true} style={{ padding: '0 24px' }}>
        추천호텔
      </Text>
      <Spacing size={16} />
      <ul>
        {호텔리스트.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={`${hotel.name} 의 사진`}
                css={imageStyles}
              />
            }
            contents={
              <ListRow.Texts
                title={hotel.name}
                subTitle={`${addDelimiter(hotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {data.length > 3 && showMore === false ? (
        <div style={{ padding: '0 24px', marginTop: '16px' }}>
          <Button full={true} weak={true} onClick={() => setSetshowMore(true)}>
            더보기
          </Button>
        </div>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  margin: 24px 0;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default RecommendHotels
