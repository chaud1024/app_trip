import { useMutation, useQuery, useQueryClient } from 'react-query'

import useUser from '@hooks/auth/useUser'
import { getReviews, removeReview, writeReview } from '@remote/review'

function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const client = useQueryClient()

  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      }
      await writeReview(newReview)

      return true
    },
    {
      onSuccess: () => {
        // 새 리뷰가 추가되었다면 기존 reviews데이터를 업데이트(쿼리 갱신)
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  const { mutate: remove } = useMutation(
    ({ hotelId, reviewId }: { hotelId: string; reviewId: string }) => {
      return removeReview({ hotelId, reviewId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  return { data, isLoading, write, remove }
}

export default useReview
