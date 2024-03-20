import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { useAlertContext } from '@context/AlertContext'
import useLike from '@hooks/like/useLike'
import { Like } from '@models/like'
import { updateOrder } from '@remote/like'

function useEditLike() {
  const { data } = useLike()
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([]) // drag&drop을 통해 변화있는 like 배열 구하기
  const [isEdit, setIsEdit] = useState(false)
  const { open } = useAlertContext()
  const client = useQueryClient()

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data)
    }
  }, [data])

  const reorder = useCallback((from: number, to: number) => {
    setIsEdit(true)
    setUpdatedLikes((prevUpdatedLikes) => {
      const newItems = [...prevUpdatedLikes]

      const [fromItem] = newItems.splice(from, 1)

      if (fromItem != null) {
        newItems.splice(to, 0, fromItem)
      }

      newItems.forEach((like, idx) => {
        like.order = idx + 1
      })

      return newItems
    })
  }, [])

  const updatedLikesSave = async () => {
    try {
      await updateOrder(updatedLikes)
      client.setQueriesData(['likes'], updatedLikes) // 캐시된 데이터를 바로 바꾸면서 곧장 업데이트된 리스트 화면 구현
      setIsEdit(false)
    } catch (e) {
      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        onButtonClick: () => {
          setIsEdit(false)
        },
      })
    }
  }

  return {
    data: isEdit ? updatedLikes : data,
    isEdit,
    reorder,
    updatedLikesSave,
  }
}

export default useEditLike
