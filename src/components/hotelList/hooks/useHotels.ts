import { getHotels } from '@remote/hotel'
import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'

export default function useHotels() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['hotels'], ({ pageParam }) => getHotels(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  return { data, loadMore, isFetching, hasNextPage }
}
