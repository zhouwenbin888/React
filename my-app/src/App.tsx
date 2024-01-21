import { useState, createContext } from "react";
import Bilibilicomment from "./Bilibilicomment";
import Demo1 from "./Demo1";
import Demo3 from "./Demo3";
import Demo4 from "./Demo4";
import Demo6 from "./Demo6";
import Demo7 from "./Demo7";


const Context = createContext<string>('');

function App() {
  const name = 'zwbzwbzwb'
  return (
    <div className="App">
      <Bilibilicomment name={name} />
      {/* <Demo1/> */}
      {/* <Context.Provider value={msg}>
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
      <Demo6 />
      <Demo7 /> */}
    </div>
  );
}

export default App;
export { Context }