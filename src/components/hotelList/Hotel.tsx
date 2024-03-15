// Hotel UI card component
import { css } from '@emotion/react'
import { Hotel as IHotel } from '@models/hotel'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import Tag from '@shared/Tag'
import Text from '@shared/Text'
import { differenceInMilliseconds, parseISO } from 'date-fns'

import formatTime from '@/utils/formatTime'
import addDelimiter from '@utils/addDelimiter'
import { useEffect, useState } from 'react'

const Hotel = ({ hotel }: { hotel: IHotel }) => {
  const [remainedTime, setRemainedTime] = useState(0)

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return
    }

    const promoEndTime = hotel.events.promoEndTime

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )
      if (남은초 < 0) {
        clearInterval(timer)
        return
      }

      setRemainedTime(남은초)
    }, 1_000)

    // 컴포넌트 언마운트시 timer종료
    return () => {
      clearInterval(timer)
    }
  }, [hotel.events])

  const tagComponent = () => {
    if (hotel.events == null) {
      return
    }

    const { name, tagThemeStyle } = hotel.events
    const promotionText =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionText)}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }
  return (
    <div>
      <ListRow
        contents={
          <Flex direction="column">
            {tagComponent()}
            <ListRow.Texts
              title={hotel.name}
              subTitle={hotel.comment}
            ></ListRow.Texts>
            <Spacing size={4} />
            <Text typography="t7" color="gray600">
              {hotel.starRating}성급
            </Text>
          </Flex>
        }
        right={
          <Flex direction="column" align="flex-end">
            <img src={hotel.mainImageUrl} alt={hotel.name} css={imageStyles} />
            <Spacing size={8} />
            <Text bold={true}>{addDelimiter(hotel.price)}원</Text>
          </Flex>
        }
        style={containerStyles}
      />
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`

export default Hotel
