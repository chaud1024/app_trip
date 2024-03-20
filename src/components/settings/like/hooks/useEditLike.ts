import { useCallback, useState } from 'react'

import useLike from '@hooks/like/useLike'
import { Like } from '@models/like'

function useEditLike() {
  const { data = [] } = useLike()
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([]) // drag&drop을 통해 변화있는 like 배열 구하기

  const reorder = useCallback(
    (from: number, to: number) => {
      const newItems = [...data]

      const [fromItem] = newItems.splice(from, 1)

      if (fromItem != null) {
        newItems.splice(to, 0, fromItem)
      }

      setUpdatedLikes(newItems)
    },
    [data],
  )

  const isEdit = updatedLikes.length > 0

  return { data: isEdit ? updatedLikes : data, isEdit, reorder }
}

export default useEditLike
