import MemoizedProfileTracker from './performance/memoization/memo/memoized-profile-tracker'
import CallbackParent from './performance/memoization/use-callback/parent'
import UsersSortingWithUseMemo from './performance/memoization/use-memo/user-sorting'

function App() {
  return (
    <div className='container m-auto p-5'>
      <h1 className='text-2xl text-blue-500'>Performance Patterns</h1>
      <div className='mt-5 border rounded p-2'>
        <h1 className='text-blue-500'>Use Memo:</h1>
        <MemoizedProfileTracker />
      </div>
      <div className='mt-5 border rounded p-2'>
        <h1 className='text-blue-500'>Use Callback:</h1>
        <CallbackParent />
      </div>
      <div className='mt-5 border rounded p-2'>
        <h1 className='text-blue-500'>Use Memo for expensive calculations:</h1>
        <UsersSortingWithUseMemo />
      </div>
    </div>
  )
}

export default App
