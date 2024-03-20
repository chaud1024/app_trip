import useReview from '@hooks/useReview'

import Text from '@shared/Text'
import { useCallback } from 'react'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'

const Review = ({ hotelId }: { hotelId: string }) => {
  const { data: reviews, isLoading } = useReview({ hotelId })

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <div>
          <Flex>
            <img src="" alt="" />
            <Spacing size={10} />
            <Text typography="t6">
              아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
            </Text>
          </Flex>
        </div>
      )
    }
  }, [reviews])

  if (isLoading === true) {
    return null
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        리뷰
      </Text>
    </div>
  )
}

export default Review
