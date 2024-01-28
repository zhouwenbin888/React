import './index.css'
interface count{
  onPlus:()=>void
  onMinus:()=>void
  count:number
}
const Count = ({ onPlus, onMinus, count }:count) => {
  return (
    <div className="goods-count">
      <span className="minus" onClick={onMinus}></span>
      <span className="count">{count}</span>
      <span className="plus" onClick={onPlus}></span>
    </div>
  )
}

export default Count
