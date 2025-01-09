import { useState } from "react"

function App() {
  const [value, setvalue] = useState(false)
  const changevalue = () => {
    setvalue(true)
  }
  return (
    <>
      this is app{value}
    </>
  )
}

export default App
