import NavBar from './components/NavBar'
import Menu from './components/Menu'
import Cart from './components/Cart'
import '../src/App.css'
import FoodsCategory from './components/FoodsCategory'
import { useEffect } from 'react'
import { fetchFoodList } from './store/modules/takeaway'
import { useAppDispatch, useAppSelector } from './store/hook'


const App = () => {
  const {foodsList,activeIndex}=useAppSelector(state=>state.foods)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchFoodList())
  }, [dispatch])
  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />

          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foodsList.map((item,index) => {
                return (
                 activeIndex===index&& <FoodsCategory
                    key={item.tag}
                    // 列表标题
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  )
}

export default App
