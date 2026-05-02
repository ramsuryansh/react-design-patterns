import { useMemo } from 'react'

function Users({ list }: { list: string[] }) {
  console.log('Users component rendered')

  // const sorted = list.sort((a, b) => a.localeCompare(b));

  const sorted = useMemo(() => {
    console.log('Sorting expensive list…')
    return [...list].sort((a, b) => a.localeCompare(b))
  }, [list])

  return (
    <>
      <h2>Sorted Users</h2>
      <ul className='list-disc pl-5 max-h-120 overflow-y-auto border rounded p-2 max-w-xl'>
        {sorted.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </>
  )
}

export default Users
