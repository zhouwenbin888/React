import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/icon'
import './index.css'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Bill, addBillList } from '@/store/modules/billStore'
import { useAppDispatch } from '@/store/hook'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
interface Data {
  type: string;
  money: number;
  date: Date;
  useFor: string;
}
const New = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [type, setType] = useState('pay')
  const [money, setmoney] = useState(0)
  const [useFor, setUseFor] = useState('')
  const [datevisible,setDatevisible]=useState(false)
  const [date,setDate]=useState(new Date())
  const moneyChange = (value: string) => {
    setmoney(Number(value))
  }
  const save = () => {
    const data: Bill = {
      type: type,
      money: type === 'pay' ? (-money) : money,
      date:date,
      useFor: useFor,
      id: uuidv4()
    }
    dispatch(addBillList(data))
  }
  const dateconfirm=(value:Date)=>{
    setDate(value)
    setDatevisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(type === 'pay' ? 'selected' : '')}
            onClick={() => { setType('pay') }}
          >
            支出
          </Button>
          <Button
            className={classNames(type === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => { setType('income') }}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" />
              <span className="text" onClick={()=>setDatevisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={datevisible}
                onConfirm={dateconfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money.toString()}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>
      <div className="kaTypeList">
        {billListData[type as keyof typeof billListData].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',useFor===item.type?'selected':''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={save}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New