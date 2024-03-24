import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd'

import useEditLike from '@components/settings/like/hooks/useEditLike'
import Button from '@shared/Button'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LikePage = () => {
  const { data, isEdit, reorder, updatedLikesSave } = useEditLike() // 찜한 호텔아이템 목록
  const navigate = useNavigate()

  const handleDragEndDrop = (result: DropResult) => {
    if (result.destination == null) {
      return
    }

    const from = result.source.index
    const to = result.destination?.index

    reorder(from, to)
  }

  console.log(data)

  if (data == null || data.length === 0) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ marginTop: 100 }}
      >
        <div>아직 찜한 호텔이 없습니다.</div>
        <Spacing size={20} />
        <Button onClick={() => navigate('/hotel')}>호텔 둘러보기</Button>
      </Flex>
    )
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEndDrop}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              {data?.map((like, idx) => {
                return (
                  <Draggable key={like.id} draggableId={like.id} index={idx}>
                    {(draggableProps) => (
                      <li
                        ref={draggableProps.innerRef}
                        {...draggableProps.draggableProps}
                        {...draggableProps.dragHandleProps}
                      >
                        <ListRow
                          as="div"
                          contents={
                            <ListRow.Texts
                              title={like.order}
                              subTitle={like.hotelName}
                            />
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                )
              })}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      {isEdit ? (
        <FixedBottomButton label="저장하기" onClick={updatedLikesSave} />
      ) : null}
    </div>
  )
}

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (enabled === false) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}

export default LikePage
