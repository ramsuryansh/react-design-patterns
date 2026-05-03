/* eslint-disable react-refresh/only-export-components */
import React from 'react'

const AppContext = React.createContext({ user: {}, theme: {} })

// Bad example: if theme changes, all consumers re-render even if they only use user data or vice versa.
// This can lead to unnecessary re-renders and performance issues.
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const user = { name: 'John Doe', loggedIn: true }
  const theme = { color: 'blue', background: 'lightgray' }

  return (
    <AppContext.Provider value={{ user, theme }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext }

// Optimized version would split into separate contexts for user and theme,
// so that changes to one don't cause re-renders in components that only consume the other.

export const UserContext = React.createContext({ name: '', loggedIn: false })
export const ThemeContext = React.createContext({ color: '', background: '' })

export function OptimizedAppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const user = { name: 'John Doe', loggedIn: true }
  const theme = { color: 'blue', background: 'lightgray' }

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </UserContext.Provider>
  )
}
