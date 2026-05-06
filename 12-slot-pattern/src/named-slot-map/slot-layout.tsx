type SlotsProp = {
  header: React.ReactNode
  sidebar: React.ReactNode
  content: React.ReactNode
  footer: React.ReactNode
}

export default function SlotLayout({ slots }: { slots: SlotsProp }) {
  return (
    <div className='container p-5 border rounded flex flex-col gap-3'>
      <header className='h-10 p-1 border rounded'>{slots.header}</header>
      <main className='flex gap-3'>
        <aside className='border rounded max-w-32 p-1'>{slots.sidebar}</aside>
        <section className='border rounded w-full p-1'>{slots.content}</section>
      </main>
      <footer className='border rounded p-1'>{slots.footer}</footer>
    </div>
  )
}
