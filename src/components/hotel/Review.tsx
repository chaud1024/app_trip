import useUser from '@hooks/auth/useUser'
import useReview from '@hooks/useReview'
import { format } from 'date-fns'
import { ChangeEvent, useCallback, useState } from 'react'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import TextField from '../shared/TextField'

const Review = ({ hotelId }: { hotelId: string }) => {
  const user = useUser()
  const { data: reviews, isLoading, write, remove } = useReview({ hotelId })
  const [text, setText] = useState('')

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <div>
          <Flex direction="column" align="center" style={{ padding: '40px 0' }}>
            <img
              src="https://cdn2.iconfinder.com/data/icons/business-development-6/24/Document_business_paper_file_paperwork_job-512.png"
              alt="review"
              width={60}
              height={60}
            />
            <Spacing size={10} />
            <Text typography="t6">
              아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
            </Text>
          </Flex>
        </div>
      )
    }

    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user.photoURL != null ? (
                <img src={review.user.photoURL} alt="" width={40} height={40} />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subTitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
            right={
              review.userId === user?.uid ? (
                <Button
                  onClick={() => {
                    remove({ reviewId: review.id, hotelId: review.hotelId })
                  }}
                >
                  삭제
                </Button>
              ) : null
            }
          />
        ))}
      </ul>
    )
  }, [reviews, user])

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  if (isLoading === true) {
    return null
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <Text bold={true} typography="t4" style={{ margin: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user != null ? (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleTextChange} />
          <Spacing size={16} />
          <Flex justify="flex-end">
            <Button
              disabled={text === ''}
              onClick={async () => {
                const success = await write(text)
                if (success) {
                  setText('')
                }
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}

export default Review
