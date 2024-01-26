import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getBillList } from '@/store/modules/billStore'
import { useAppDispatch } from '@/store/hook'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from 'antd-mobile-icons'
import { Badge, TabBar } from 'antd-mobile'
import './index.css'

const tabs = [
  {
    key: '/month',
    title: '月度账单',
    icon: <BillOutline />,
    badge: Badge.dot,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
    badge: '5',
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]
const Layout = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  useEffect(() => {
    navigate('/month')
  }, []) 
  const navigate = useNavigate()
  const switchRouter = (value: string) => {
    console.log(value)
    navigate(value)
  }

  return (
    <div className='layout'>
      <div className='container'>
        <Outlet/>
      </div>
      <div className='footer'>
        <TabBar onChange={switchRouter}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout