import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const tokenInputRef = useRef();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
      const token = localStorage.getItem('token');

      if (localStorage.getItem('token').length === 36) {
        console.log(`Good Token (${token})`);
      } else {
        console.error(`BAD Token (${token})`);
      }
    }
  }, []);

  const onAuthClick = () => {
    if (!isAuth) {
      localStorage.setItem('token', tokenInputRef.current.value);
      window.location.reload();
    } else {
      setIsAuth(false);
      localStorage.removeItem('token');
    }
  };

  return (
    <div className='header'>
      <div className='header__logo'>
        <Link to='/' className='header__logo-img'></Link>
        <Link to='/' className='header__name'>
          Faceit Assistant
        </Link>
      </div>
      <div className='header__auth'>
        {isAuth ? (
          <p className='header__auth-status'>Authorized</p>
        ) : (
          <input
            className='token__auth-input'
            type='password'
            placeholder='Enter your API token...'
            ref={tokenInputRef}
            required
          />
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
  );
};

export default Header;
