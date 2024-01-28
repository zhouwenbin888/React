import { Food, Takeaway } from '../../store/modules/takeaway'
import FoodItem from './FoodItem'
import './index.css'

const FoodsCategory = ({ name, foods }: { name: string; foods: Food[] }) => {
  return (
    <div className="category">
      <dl className="cate-list">
        <dt className="cate-title">{name}</dt>

        {foods.map(item => {
          return <FoodItem key={item.id} {...item} />
        })}
      </dl>
    </div>
  )
}

export default FoodsCategory
