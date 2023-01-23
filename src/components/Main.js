import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GetId from './GetId'
import CommonMatches from './CommonMatches'
import Nav from './Nav'

const Main = () => {
  return (
    <div className='main'>
      <Nav />
      <div className='main__content'>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/get-id' element={<GetId />} />
          <Route path='/common-matches' element={<CommonMatches />} />
        </Routes>
      </div>
    </div>
  )
}

export default Main
