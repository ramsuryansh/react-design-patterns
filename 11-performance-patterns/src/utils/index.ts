function getUsers(): string[] {
  const usernames: string[] = []

  const count = 1000

  for (let i = 0; i < count; i++) {
    const firstName = 'Ram'
    const lastName = ' Suryansh ' + i

    const username = `${firstName}${lastName}`
    usernames.push(username)
  }

  return usernames
}

export { getUsers }
