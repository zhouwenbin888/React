import { useState, createContext } from "react";
import Demo3 from "./Demo3";
import Demo2 from "./Demo2";
import Demo4 from "./Demo4";

 const Context = createContext<string>('');

function App() {
 
  const name = 'zwbzwbwbhu'
  const [msg, setMsg] = useState('')
  const getmsg = (msg: string) => {
    console.log(msg)
    setMsg(msg)
  }

  return (
    <div className="App">
      <Demo2 name={msg} />
      <Context.Provider value={msg}>
        <Demo4 />
      </Context.Provider>

      <div>{msg}</div>
      <Demo3
        name={name}
        age={18}
        isTrue={false}
        list={['vue', 'react']}
        obj={{ name: 'jack' }}
        cb={getmsg}
        child={<span>8888</span>}
      ><span>oo</span></Demo3>
    </div>
  );
}

export default App;
export {Context}