import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GetId from './GetId'
import CommonMatches from './CommonMatches'
import Nav from './Nav'
import MapStats from './MapStats'

const Main = () => {
  return (
    <div className='main'>
      <Nav />
      <div className='main__content'>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/get-id' element={<GetId />} />
          <Route path='/common-matches' element={<CommonMatches />} />
          <Route path='/map-stats' element={<MapStats />} />
        </Routes>
      </div>
    </div>
  )
}

export default Main
