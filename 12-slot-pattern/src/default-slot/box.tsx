import type { ReactNode } from 'react'

const Box = ({ children }: { children: ReactNode }) => {
  return (
    <div className='max-w-sm p-2 border rounded overflow-auto'>{children}</div>
  )
}

export default Box
