/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'

const Cart = ({ items }: { items: { price: number }[] }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const sum = items.reduce((acc, item) => acc + item.price, 0)
    setTotal(sum)
  }, [items])

  return <h2>Total: {total}</h2>
}

export default Cart
