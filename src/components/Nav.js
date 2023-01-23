import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
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
  )
}

export default Nav
