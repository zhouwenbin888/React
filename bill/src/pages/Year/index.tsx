import { NavBar, DatePicker } from 'antd-mobile'
import './index.css'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useAppSelector } from '@/store/hook'
import _, { keys } from 'lodash'
import { Bill } from '@/store/modules/billStore'
import Month from './components/Month/Month'

const Year = () => {

  const billList = useAppSelector(state => state.bill.billList)
  const [datevisible, setDatevisible] = useState(false)
  const [currentDate, setcurrentDate] = useState(dayjs(new Date()).format('YYYY'))
  const [currentMonthList, setMonthList] = useState<Bill[]>([])

  const YearGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY'))
  }, [billList])



  const monthResult = useMemo(() => {
    const pay = YearGroup[currentDate]?.filter(item => item.type === 'pay')?.reduce((a, c) => a + c.money, 0) || 0
    const income = YearGroup[currentDate]?.filter(item => item.type === 'income')?.reduce((a, c) => a + c.money, 0) || 0
    return { pay, income, total: pay + income }
  }, [currentMonthList])

  useEffect(() => {
    const nowDate = dayjs(new Date()).format('YYYY')
    if (YearGroup[nowDate]) {
      setMonthList(YearGroup[nowDate])
    }
    console.log(YearGroup)
  }, [YearGroup])

  const dayGroup = useMemo(() => {
    const daygroup = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM'))
    const keyList = Object.keys(daygroup)
    return { daygroup, keyList }
  }, [currentMonthList])

  const confirm = (date: Date) => {
    const formatDate = dayjs(date).format('YYYY')
    setMonthList(YearGroup[formatDate])
    setcurrentDate(formatDate)
    setDatevisible(false)
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        年度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              {currentDate} 账单
            </span>
            <span className={classNames('arrow', datevisible && 'expand')} onClick={() => { setDatevisible(!datevisible) }}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="year"
            visible={datevisible}
            max={new Date()}
            onClose={() => {
              setDatevisible(false)
            }}
            onConfirm={confirm}
            onCancel={() => {
              setDatevisible(false)
            }}
          />
        </div>
        {
          dayGroup.keyList.map(key => {
            return (<Month key={key} date={key} billList={dayGroup.daygroup[key]} />)
          })
        }
      </div>
    </div >
  )
}

export default Year