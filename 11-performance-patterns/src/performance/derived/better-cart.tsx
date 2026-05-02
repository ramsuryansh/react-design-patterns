const Cart = ({ items }: { items: { price: number }[] }) => {
  const sum = items.reduce((acc, item) => acc + item.price, 0)

  return <h2>Total: {sum}</h2>
}

export default Cart
