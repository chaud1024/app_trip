import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
} from 'react-beautiful-dnd'

import { useEffect, useState } from 'react'
import ListRow from '@components/shared/ListRow'

const LikePage = () => {
  const data = [] // 찜한 호텔아이템 목록
  return (
    <div>
      <DragDropContext onDragEnd={() => {}}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              {data?.map(() => {
                return (
                  <Draggable key={} draggableId={} index={}>
                    {(draggableProps) => (
                      <li
                        ref={draggableProps.innerRef}
                        {...draggableProps.draggableProps}
                        {...draggableProps.dragHandleProps}
                      >
                        <ListRow
                          as="div"
                          contents={<ListRow.Texts title={} subTitle={} />}
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
