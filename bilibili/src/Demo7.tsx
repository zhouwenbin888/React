import React, { useState } from 'react'

function useHide(){
    const[value,setValue]=useState(true)
    const hide=()=>{
        setValue(!value)
    }
    return {value,hide}
}

function Demo7() {
  const {value,hide}=useHide()
  return (
    <div>
        {value&&<span>你好</span>}
        <button onClick={hide}>隐藏</button>
    </div>
  )
}

export default Demo7