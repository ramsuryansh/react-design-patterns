import { useState } from 'react'
import { getUsers } from '../../../utils'
import Users from './users'

const UsersSortingWithUseMemo = () => {
  const [count, setCount] = useState(0)
  const [users] = useState(() => getUsers()) // assume it returns 10,000 users

  return (
    <>
      <div className='flex items-center gap-4 mb-4'>
        <button
          className='p-1 border rounded bg-blue-500 text-white'
          onClick={() => setCount((c) => c + 1)}
        >
          Increment
        </button>
        <p>Count: {count}</p>
      </div>
      <Users list={users} />
    </>
  )
}

export default UsersSortingWithUseMemo
