import React, { useState } from 'react'
import Header from './Header'
import Main from './Main'
import { Context } from '../utils/context'

function App() {
  const [nickname, setNickname] = useState('')

  return (
    <Context.Provider value={{ nickname, setNickname }}>
      <Header />
      <Main />
    </Context.Provider>
  )
}

export default App
