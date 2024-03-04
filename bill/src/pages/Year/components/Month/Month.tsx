import classNames from 'classnames'
import './index.css'
import { Bill } from '@/store/modules/billStore'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/contants/index'
import Icon from '@/components/icon'
interface DayProps {
  date: string;
  billList: Bill[];
}

const Month: React.FC<DayProps> = ({ date, billList }) => {
  const [visible, setvisible] = useState(false)
  const dayResult = useMemo(() => {
    const pay = billList?.filter(item => item.type === 'pay')?.reduce((a, c) => a + c.money, 0) || 0
    const income = billList?.filter(item => item.type === 'income')?.reduce((a, c) => a + c.money, 0) || 0
    return { pay, income, total: pay + income }
  }, [billList])

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span onClick={() => setvisible(!visible)} className={classNames('arrow', visible && 'expand')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {visible && <div className="billList">
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>}
    </div>
  )
}
export default Month