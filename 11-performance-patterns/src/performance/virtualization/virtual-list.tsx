import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

import CardItem from './card-item'
import type { User } from './data'

export default function VirtualList({ users }: { users: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  // TanStack Virtual owns scroll measurement state inside this component.
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 6,
  })

  return (
    <div ref={parentRef} className='h-56 overflow-auto border rounded p-1'>
      <div
        className='relative w-full'
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const user = users[virtualRow.index]

          return (
            <div
              key={virtualRow.key}
              ref={rowVirtualizer.measureElement}
              className='absolute left-0 top-0 w-full'
              data-index={virtualRow.index}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <CardItem user={user} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
