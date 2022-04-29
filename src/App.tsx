import React, { ChangeEvent, useRef, useState } from 'react'
import { debounce } from 'lodash'
import axios, { Canceler } from 'axios'
import './App.scss'
import logo from './assets/imgs/logo.png'

interface IResopnse {
  data: {
    code: number
    name: string
    qlogo: string
    qq: string
    msg?: string
  }
}
interface ICard {
  name: string
  qq: string
  qlogo: string
}

const QCard: React.FC<ICard> = ({ name, qq, qlogo }) => {
  const turnStr = (str: string, length: number) => {
    if (str.length > length) {
      return (
        str.slice(0, Math.ceil(length / 2)) +
        '*' +
        str.slice(-(length - Math.ceil(length / 2)))
      )
    }
    return str
  }
  return (
    <div className="qq-card">
      <img className="qq-card-img" src={qlogo || logo} alt="loading" />
      <div className="qq-card-des">
        <div>{turnStr(name || '-', 5)}</div>
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
  const handleCancleQuery = () => {
    if (lastRequestToken.current) {
      lastRequestToken.current('cancel')
    }
  }
  const handleInput = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const testQQ = /^[1-9][0-9]{4,12}$/
    
      setError(undefined)
      setUserInfo(null)
      if (testQQ.test(e.target.value)) {
        setLoading(true)
        handleCancleQuery()
        const res: IResopnse = await axios.get(
          'https://api.uomg.com/api/qq.info',
          {
            params: { qq: e.target.value.trim() },
            cancelToken: new axios.CancelToken((c: Canceler) => {
              lastRequestToken.current = c
            }),
          }
        )
        if (res.data.code === 1) {
          const { name, qq, qlogo } = res.data
          setUserInfo({ name, qq, qlogo })
        } else {
          if (res.data.msg) {
            throw res.data.msg
          }
        }
        setLoading(false)
      }
    } catch (err) {
      if (typeof err === 'string') {
        setError(err as string)
      }
      else if(typeof err === 'object'){
       
        if((err as any)?.message==='cancel'){
          return 
        }
        setError('请求错误，请稍后再试')
      }
      setLoading(false)
     
    }
  }, 300)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQValue(e.target.value)
  }
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
          onInput={handleInput}
          placeholder="输入qq号，自动查询"
        />
        <span className={`qq-reset ${qValue.trim().length>0?"":"hidden"}`} onClick={handleReset}>
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
            <div className="qq-loading-cancleQuery" onClick={handleCancleQuery}>
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
