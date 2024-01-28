import classNames from 'classnames'
import './index.css'
import { changeActiveIndex } from '../../store/modules/takeaway'
import { useAppDispatch, useAppSelector } from '../../store/hook'

const Menu = () => {
  const { foodsList, activeIndex } = useAppSelector(state => state.foods)
  const dispatch = useAppDispatch()
  const menus = foodsList.map(item => ({ tag: item.tag, name: item.name }))
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item, index) => {
        return (
          <div
            onClick={() => dispatch(changeActiveIndex(index))}
            key={item.tag}
            className={classNames(
              'list-menu-item',
              activeIndex === index && 'active'
            )}
          >
            {item.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
