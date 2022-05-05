import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import axios, { Canceler } from 'axios'
import './App.scss'
import logo from './assets/imgs/logo.png'


interface ICard {
  name: string
  qq: string
  qlogo: string
}

const QCard: React.FC<ICard> = ({ name, qq, qlogo }) => {
  const turnStr = (str: string, length: number) => {
    if (str === null) {
      return '-'
    }
    if (str.length > length) {
      return (
        str.slice(0, Math.ceil(length / 2)) +
        '*' +
        str.slice(-(length - Math.ceil(length / 2)))
      )
    }
    return str?.trim() || '-'
  }
  return (
    <div className="qq-card">
      <img className="qq-card-img" src={qlogo || logo} alt="loading" />
      <div className="qq-card-des">
        <div>{turnStr(name, 5)}</div>
        <div>{qq || '-'}</div>
      </div>
    </div>
  )
}
function App() {
  const [loading, setLoading] = useState(false)
  const [qValue, setQValue] = useState('')
  const [error, setError] = useState<undefined | string>(undefined)
  const [userInfo, setUserInfo] = useState<ICard | null>(null)
  let lastRequestToken = useRef<null | Canceler>(null)
  const handleCancleQuery = (closeLoading?: boolean) => {
    if (lastRequestToken.current) {
      lastRequestToken.current('cancel')
    }
    closeLoading && setLoading(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQValue(e.target.value)
  }
  const handleSearch=useCallback( debounce((qValue:string)=>{

    try {
      const testQQ = /^[1-9][0-9]{4,12}$/

      setError(undefined)
      setUserInfo(null)
      handleCancleQuery()
      if (testQQ.test(qValue)) {
        setLoading(true)
       
        axios
          .get('https://api.uomg.com/api/qq.info', {
            params: { qq: qValue.trim() },
            cancelToken: new axios.CancelToken((c: Canceler) => {
              lastRequestToken.current = c
            }),
          })
          .then((res) => {
            if (res.data.code === 1) {
              const { name, qq, qlogo } = res.data
              setUserInfo({ name, qq, qlogo })
            } else {
              if (res.data.msg) {
                throw res.data.msg
              }
            }
            setLoading(false)
          }).catch(err=>{})

      
      }
    } catch (err) {
      if (typeof err === 'string') {
        setError(err as string)
      } else if (typeof err === 'object') {
        if ((err as any)?.message === 'cancel') {
          return
        }
        setError('请求错误，请稍后再试')
      }
      setLoading(false)
    }
  },500),[])
  useEffect(() => {
    handleSearch(qValue)
  }, [handleSearch,qValue])

  const handleReset = () => {
    handleCancleQuery()
    setQValue('')
    setUserInfo(null)
    setError('')
  }

  return (
    <div className="App">
      <div className="qq">
        <h1>qq号查询</h1>
        QQ
        <input
          className="qq-input"
          value={qValue}
          maxLength={12}
          type="text"
          onChange={handleChange}
       
          placeholder="输入qq号，自动查询"
        />
        <span
          className={`qq-reset ${qValue.trim().length > 0 ? '' : 'hidden'}`}
          onClick={handleReset}
        >
          X
        </span>
        {loading === true && (
          <div className="qq-loading">
            <svg className="circular" viewBox="25 25 50 50">
              <circle
                className="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
            </svg>
            <div
              className="qq-loading-cancleQuery"
              onClick={() => handleCancleQuery(true)}
            >
              取消
            </div>
          </div>
        )}
        {userInfo !== null && <QCard {...userInfo}></QCard>}
        {error && <div className="qq-error">{error}</div>}
      </div>
    </div>
  )
}

export default App
