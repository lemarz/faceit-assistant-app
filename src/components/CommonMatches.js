import React, { useState, useRef } from 'react'
import { Button, Card } from 'react-bootstrap'
import api from '../utils/Api'

const CommonMatches = () => {
  const firstPlayerRef = useRef()
  const secondPlayerRef = useRef()

  const [commonMatches, setCommonMatches] = useState([])
  const [isButtonValid, setIsButtonValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [noOneJointMatch, setNoOneJointMatch] = useState(false)
  const [firstPlayerError, setFirstPlayerError] = useState('')
  const [secondPlayerError, setSecondPlayerError] = useState('')

  const setValidity = () => {
    if (
      firstPlayerRef.current.value.length > 2 &&
      secondPlayerRef.current.value.length > 2
    ) {
      setIsButtonValid(true)
    } else {
      setIsButtonValid(false)
    }
  }

  const reformatDate = (unix) => {
    const dateObject = new Date(unix * 1000)
    return dateObject.toLocaleString()
  }

  const findCommonElements = (arr1, arr2) => {
    let anyCommonMatches = false

    arr1.forEach((item1) => {
      arr2.forEach((item2) => {
        if (item1.match_id === item2.match_id) {
          setCommonMatches((prevState) => [...prevState, item1])
          anyCommonMatches = true
        }
      })
    })

    if (!anyCommonMatches) {
      console.log('Поменял стейт на тру')
      setNoOneJointMatch(true)
    }
  }

  const findCommonMatches = (name1, name2) => {
    setCommonMatches([])
    setNoOneJointMatch(false)
    setFirstPlayerError('')
    setSecondPlayerError('')
    let matchesArr1, matchesArr2
    let idArr = []

    api
      .playerId(name1)
      .then((id1) => (idArr[0] = id1))
      .catch((err) => {
        if (err.status === 401) {
          setFirstPlayerError('Не авторизованно')
          setSecondPlayerError('Не авторизованно')
          return Promise.reject()
        }
        setFirstPlayerError('Пользователь не найден')
      })
      .then(() => {
        api
          .playerId(name2)
          .then((id2) => (idArr[1] = id2))
          .catch((err) => setSecondPlayerError('Пользователь не найден'))
          .then(() => {
            if (!idArr[0] || !idArr[1]) {
              setIsLoading(false)
              return Promise.reject()
            }
            return idArr
          })
          .then((idArr) => {
            Promise.all([
              api.playerMatches(idArr[0], 0),
              api.playerMatches(idArr[0], 100),
              api.playerMatches(idArr[0], 200),
              api.playerMatches(idArr[0], 300),
              api.playerMatches(idArr[0], 400),
              api.playerMatches(idArr[0], 500),
              api.playerMatches(idArr[0], 600),
              api.playerMatches(idArr[0], 700),
              api.playerMatches(idArr[0], 800),
              api.playerMatches(idArr[0], 900),
              api.playerMatches(idArr[0], 1000),
            ])
              .then((resMatchesArr) => (matchesArr1 = resMatchesArr.flat()))
              .then(() => {
                Promise.all([
                  api.playerMatches(idArr[1], 0),
                  api.playerMatches(idArr[1], 100),
                  api.playerMatches(idArr[1], 200),
                  api.playerMatches(idArr[1], 300),
                  api.playerMatches(idArr[1], 400),
                  api.playerMatches(idArr[1], 500),
                  api.playerMatches(idArr[1], 600),
                  api.playerMatches(idArr[1], 700),
                  api.playerMatches(idArr[1], 800),
                  api.playerMatches(idArr[1], 900),
                  api.playerMatches(idArr[1], 1000),
                ])
                  .then((resMatchesArr) => (matchesArr2 = resMatchesArr.flat()))
                  .then(() => {
                    findCommonElements(matchesArr1, matchesArr2)
                    setIsLoading(false)
                  })
                  .catch(console.error)
              })
          })
      })
  }

  const onSubmit = () => {
    setIsLoading(true)
    findCommonMatches(
      firstPlayerRef.current.value,
      secondPlayerRef.current.value
    )
  }

  return (
    <>
      <h3 className='form__title'>Найти совместные матчи</h3>
      <form className='form'>
        <div className='form__input-area'>
          <input
            className='form__input'
            placeholder='Ник первого игрока'
            type='text'
            onInput={setValidity}
            ref={firstPlayerRef}
          />
          <span className='form__input-error'>{firstPlayerError}</span>
          <input
            className='form__input'
            placeholder='Ник второго игрока'
            type='text'
            onInput={setValidity}
            ref={secondPlayerRef}
          />
          <span className='form__input-error'>{secondPlayerError}</span>
        </div>
        <Button
          variant='primary'
          type='submit'
          className='form__button-submit'
          disabled={!isButtonValid || isLoading}
          onClick={onSubmit}
        >
          {isLoading ? 'Поиск…' : 'Найти'}
        </Button>
      </form>
      {noOneJointMatch && (
        <div className='result__title'> Нет совместных матчей</div>
      )}
      {commonMatches[0] && (
        <div className='result__title'> Совместные матчи</div>
      )}
      <div className='result__cards'>
        {commonMatches.map((item, i) => {
          return (
            <Card
              className='result__card'
              key={item.match_id + i}
              style={{ width: '13rem' }}
              bg='dark'
            >
              <Card.Body>
                <Card.Title className='result__card-title'>
                  {i + 1} Match
                </Card.Title>
                <Card.Text>{reformatDate(item.finished_at)}</Card.Text>

                <Button
                  className='result__button-matchroom'
                  href={`https://www.faceit.com/en/csgo/room/${item.match_id}`}
                  target='blank'
                  variant='outline-warning'
                >
                  Match Room
                </Button>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default CommonMatches
