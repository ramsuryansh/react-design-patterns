import AddToCartButton from './components/pub/add-to-card-btn'
import CartBadge from './components/sub/cart-badge'

function App() {
  return (
    <div className='flex flex-col items-center m-2'>
      <AddToCartButton />
      <CartBadge />
    </div>
  )
}

export default App
