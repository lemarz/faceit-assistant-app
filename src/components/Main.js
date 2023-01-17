import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import GetId from './GetId'
import CommonMatches from './CommonMatches'

const Main = () => {
  return (
    <div className='main'>
      <nav className='main__nav'>
        <ul className='main__nav-bar'>
          <li className='main__nav-list'>
            <Link to='/ ' className='main__nav-link'>
              Главная
            </Link>
          </li>
          <li className='main__nav-list'>
            <Link to='/get-id' className='main__nav-link'>
              Узнать Id
            </Link>
          </li>
          <li className='main__nav-list'>
            <Link to='/common-matches' className='main__nav-link'>
              Общие матчи
            </Link>
          </li>
        </ul>
      </nav>
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
