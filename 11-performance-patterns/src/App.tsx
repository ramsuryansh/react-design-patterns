import SearchDemo from './performance/debouncing/search-demo'
import WithLazyLoading from './performance/lazy-loading/with-lazy-loading'
// import WithoutLazyLoading from './performance/lazy-loading/without-lazy-loading'
import MemoizedProfileTracker from './performance/memoization/memo/memoized-profile-tracker'
import CallbackParent from './performance/memoization/use-callback/parent'
import UsersSortingWithUseMemo from './performance/memoization/use-memo/user-sorting'
import ScrollTracker from './performance/throttling/scroll-tracker'
import { useFakeUsers } from './performance/virtualization/data'
import NonVirtualList from './performance/virtualization/non-virtual-list'
import VirtualList from './performance/virtualization/virtual-list'

function App() {
  const users = useFakeUsers() // Generate 50k users for virtualization demo

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='container p-5'>
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
          <h1 className='text-blue-500'>
            Use Memo for expensive calculations:
          </h1>
          <UsersSortingWithUseMemo />
        </div>
        <div className='mt-5 border rounded p-2'>
          <h1 className='text-blue-500'>Debouncing:</h1>
          <SearchDemo />
        </div>
        <div className='mt-5 border rounded p-2'>
          <h1 className='text-blue-500'>Throttling:</h1>
          <ScrollTracker />
        </div>
      </div>
      <div className='container p-5'>
        <h1 className='text-2xl text-green-500'>Lazy Loading</h1>
        {/* <WithoutLazyLoading /> */}
        <WithLazyLoading />
        <h1 className='text-2xl text-blue-500 mt-5 '>
          Virtualization VS Non-Virtualization
        </h1>
        <div className='border rounded p-2'>
          <h1 className='text-blue-500'>Non-Virtualization</h1>
          <NonVirtualList users={users} />
        </div>
        <div className='border rounded p-2 mt-5'>
          <h1 className='text-blue-500'>Virtualization</h1>
          <VirtualList users={users} />
        </div>
      </div>
    </div>
  )
}

export default App
