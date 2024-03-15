// Hotel UI card component

import { css } from '@emotion/react'
import { Hotel as IHotel } from '@models/hotel'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import Tag from '@shared/Tag'
import Text from '@shared/Text'
import addDelimiter from '@utils/addDelimiter'

const Hotel = ({ hotel }: { hotel: IHotel }) => {
  const tagComponent = () => {
    if (hotel.events == null) {
      return
    }

    const { name } = hotel.events
    return (
      <div>
        <Tag>{name}</Tag>
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
