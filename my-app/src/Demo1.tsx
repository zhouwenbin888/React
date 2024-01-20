import { useState } from "react"

//项目的根组件
const message = 'this is App'
const login = true
const articleType: number = 1
const list = [
  { id: 1, name: 'zwb', love: true },
  { id: 2, name: 'zxy', love: false }
]

function getArticle() {
  if (articleType == 0) {
    return (<div>这是一个无图文章</div>)
  }
  else if (articleType == 1) {
    return (<div>这是一个单图文章</div>)
  }
  else {
    return (<div>这是一个多图文章</div>)
  }
}

function getName() {
  return 'hu'
}

function Button() {
  return <button>dd</button>
}

function Demo1() {
  const [count, setCount] = useState(0)
  const [from, setfrom] = useState({ name: 'jack' })
  const handClick1 = () => {
    setCount(count + 1)
  }

  const changeFrom = () => {
    setfrom({
      ...from,
      name: 'john'
    })
  }

  const handClick = (e: any) => {
    alert('被点击了')
    console.log(e)
  }
  return (
    <div className="App">
      <Button />
      <div>
        {message}
        {getName()}
        {Date()}
        {login && <span>true</span>}
        {login ? <span>zwb</span> : <span>zxy</span>}
        {getArticle()}
        <button onClick={() => handClick({ message })}>按钮</button>
        <button onClick={changeFrom}>{from.name}</button>
        <button onClick={handClick1}>{count}</button>
      </div>
      <div>
        <ul>
          {list.map(item => <li key={item.id}>{item.name},{item.love ? 'love' : 'like'}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default Demo1;
