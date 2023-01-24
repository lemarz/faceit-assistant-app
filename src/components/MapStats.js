import React, { useRef, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import api from '../utils/Api'

const MapStats = () => {
  const matchInputRef = useRef()
  const [matchInfo, setMatchInfo] = useState()
  const [status, setStatus] = useState(false)
  const [isButtonValid, setIsButtonValid] = React.useState(false)
  const mapArr = [
    'de_vertigo',
    'de_inferno',
    'de_ancient',
    'de_nuke',
    'de_overpass',
    'de_mirage',
    'de_dust2',
    'de_anubis',
  ]

  const setButtonValidity = () => {
    matchInputRef.current.value.length > 38
      ? setIsButtonValid(true)
      : setIsButtonValid(false)
  }

  const getMatchId = (link) => {
    let matchId
    matchId = link.replace('https://www.faceit.com/en/csgo/room/', '')
    matchId = matchId.replace('/scoreboard', '')
    return matchId
  }

  const onButtonSubmit = (e) => {
    e.preventDefault()
    setStatus(false)
    const matchId = getMatchId(matchInputRef.current.value)
    getMatchInfo(matchId)
  }

  const getMatchInfo = (matchId) => {
    let teams = {}

    api
      .matchInfo(matchId)
      .then((matchInfo) => {
        teams = matchInfo.teams
      })
      .then(() => {
        teams.faction1.roster.forEach((playerObj) => {
          api
            .playerStatistic(playerObj.player_id)
            .then((statRes) => (playerObj.mapStat = statRes))
        })
      })
      .then(() => {
        teams.faction2.roster.forEach((playerObj) => {
          api
            .playerStatistic(playerObj.player_id)
            .then((statRes) => (playerObj.mapStat = statRes))
        })
      })
      .then(() => {
        setMatchInfo(teams)
        setTimeout(() => {
          setStatus(true)
        }, 1000)
      })
  }
  return (
    <>
      <h3 className='form__title'>Статистика карт</h3>
      <form className='form'>
        <div className='form__input-area'>
          <input
            className='form__input'
            placeholder='Ссылка на матч...'
            type='text'
            defaultValue='https://www.faceit.com/en/csgo/room/1-586ce16d-ab57-4d7b-b833-6061cea0a3f0'
            onInput={setButtonValidity}
            ref={matchInputRef}
          />
          {/*<span className='form__input-error'>{error}</span>*/}
        </div>
        <Button
          variant='primary'
          type='submit'
          className='form__button-submit'
          disabled={!isButtonValid}
          onClick={onButtonSubmit}
        >
          Получить
        </Button>
      </form>
      <div className='result'>
        <div className='result__title'>Статистика карт</div>
        <div className='result__id-field'>
          {status && (
            <Table size='sm' striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th> </th>
                  <th>Vertigo</th>
                  <th>Inferno</th>
                  <th>Ancient</th>
                  <th>Nuke</th>
                  <th>Overpass</th>
                  <th>Mirage</th>
                  <th>Dust2</th>
                  <th>Anubis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9}>{matchInfo.faction1.name} </td>
                </tr>
                {matchInfo.faction1.roster.map((playerObj, i) => {
                  return (
                    <tr key={playerObj.player_id}>
                      <td className='result__table-nickname'>
                        {playerObj.nickname}
                      </td>
                      {mapArr.map((mapTitle, i) => {
                        return (
                          <td key={'_' + i + mapTitle}>
                            {status &&
                              playerObj.mapStat.segments.map((mapObj) => {
                                if (
                                  mapObj.label === mapTitle &&
                                  mapObj.mode === '5v5'
                                ) {
                                  return (
                                    <div
                                      key={`_${i}`}
                                      className='result__table-stats'
                                    >
                                      <p className='result__table-paragraph'>
                                        {mapObj.stats.Matches} /
                                        {mapObj.stats['Win Rate %']}%
                                      </p>
                                      <p className='result__table-paragraph'>
                                        {Math.trunc(
                                          mapObj.stats['Average Kills']
                                        )}{' '}
                                        /{mapObj.stats['Average K/D Ratio']}
                                      </p>
                                    </div>
                                  )
                                }
                              })}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}

                <tr>
                  <td colSpan={9}>{matchInfo.faction2.name}</td>
                </tr>
                {matchInfo.faction2.roster.map((playerObj, i) => {
                  return (
                    <tr key={playerObj.player_id}>
                      <td className='result__table-nickname'>
                        {playerObj.nickname}
                      </td>
                      {mapArr.map((mapTitle, i) => {
                        return (
                          <td key={'_' + i + mapTitle}>
                            {status &&
                              playerObj.mapStat.segments.map((mapObj) => {
                                if (
                                  mapObj.label === mapTitle &&
                                  mapObj.mode === '5v5'
                                ) {
                                  return (
                                    <div
                                      key={`_${i}`}
                                      className='result__table-stats'
                                    >
                                      <p className='result__table-paragraph'>
                                        {mapObj.stats.Matches} /
                                        {mapObj.stats['Win Rate %']}%
                                      </p>
                                      <p className='result__table-paragraph'>
                                        {Math.trunc(
                                          mapObj.stats['Average Kills']
                                        )}{' '}
                                        /{mapObj.stats['Average K/D Ratio']}
                                      </p>
                                    </div>
                                  )
                                }
                              })}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  )
}

export default MapStats
