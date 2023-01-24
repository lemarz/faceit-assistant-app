import React, { useState, useRef, useEffect, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '../utils/context'

const Header = () => {
  const { nickname, setNickname } = useContext(Context)

  const [isAuth, setIsAuth] = useState(false)
  const tokenInputRef = useRef()
  const nicknameInputRef = useRef()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
      setNickname(localStorage.getItem('faceitNickname'))
      const token = localStorage.getItem('token')

      if (localStorage.getItem('token').length === 36) {
        console.log(`Good Token (${token})`)
      } else {
        console.warn(`BAD Token (${token})`)
      }
    }
  }, [])

  const onAuthClick = () => {
    if (!isAuth) {
      localStorage.setItem('token', tokenInputRef.current.value)
      localStorage.setItem('faceitNickname', nicknameInputRef.current.value)
      window.location.reload()
    } else {
      setIsAuth(false)
      localStorage.removeItem('token')
      localStorage.removeItem('faceitNickname')
    }
  }

  return (
    <div className='header'>
      <div className='header__logo'>
        <Link to='/' className='header__logo-img'></Link>
        <Link to='/' className='header__tittle'>
          Faceit Assistant
        </Link>
      </div>
      <div className='header__auth'>
        {isAuth ? (
          <p className='header__auth-status'>Authorized {nickname}</p>
        ) : (
          <>
            <input
              className='token__auth-input'
              type='text'
              placeholder='Faceit nickname...'
              ref={nicknameInputRef}
              required
            />
            <input
              className='token__auth-input'
              type='password'
              placeholder='API token...'
              ref={tokenInputRef}
              required
            />
          </>
        )}

        <Button
          variant='outline-info'
          className='header__auth-button'
          onClick={onAuthClick}
        >
          {isAuth ? 'Relogin' : 'Auth'}
        </Button>
      </div>
    </div>
  )
}

export default Header
