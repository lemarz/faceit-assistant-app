import React, { useState, useRef, useContext } from 'react'
import { Button } from 'react-bootstrap'
import api from '../utils/Api'
import { Context } from '../utils/context'

const GetId = () => {
  const { nickname } = useContext(Context)

  const [id, setId] = useState('')
  const [error, setError] = React.useState('')
  const [isButtonValid, setIsButtonValid] = React.useState(false)

  const nickInputRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()

    api
      .playerId(nickInputRef.current.value)
      .then((res) => {
        setError('')
        setId(res)
      })
      .catch((err) => {
        if (err.status === 404) {
          setError('Пользователь не найден')
        } else if (err.status === 401) {
          setError('Не авторизованно')
        } else {
          setError(err)
        }

        setId('')
        nickInputRef.current.value = ''
      })
  }

  const fillNicknameInput = () => {
    nickInputRef.current.value = nickname
    setButtonValidity()
  }

  const setButtonValidity = () => {
    nickInputRef.current.value.length > 2
      ? setIsButtonValid(true)
      : setIsButtonValid(false)
  }

  return (
    <>
      <h3 className='form__title'>Получить ID игрока</h3>
      <form className='form'>
        <div className='form__input-area'>
          {nickname && (
            <Button
              className='form__nick-button'
              variant='outline-success'
              onClick={fillNicknameInput}
            >
              ↓ {nickname} ↓
            </Button>
          )}
          <input
            className='form__input'
            placeholder='Ник игрока...'
            type='text'
            onInput={setButtonValidity}
            ref={nickInputRef}
          />
          <span className='form__input-error'>{error}</span>
        </div>
        <Button
          variant='primary'
          type='submit'
          className='form__button-submit'
          disabled={!isButtonValid}
          onClick={onSubmit}
        >
          Получить
        </Button>
      </form>
      <div className='result'>
        {id ? <div className='result__title'>Id Игрока</div> : ''}
        <div className='result__id-field'>{id}</div>
      </div>
    </>
  )
}

export default GetId
