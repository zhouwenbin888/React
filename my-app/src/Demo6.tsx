import React, { useEffect, useState } from 'react';

const URL = 'http://geek.itheima.net/v1_0/channels';

interface Channel {
  id: number;
  name: string;
}
function Son() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器执行中')
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (<div></div>)
}

function Demo6() {
  const [list, setList] = useState<Channel[]>([]);

  useEffect(() => {
    async function getList() {
      const res = await fetch(URL);
      const relist = await res.json();
      console.log(relist);
      setList(relist.data.channels);
    }
    getList();
    console.log(list);
  }, []);
  const [show, setshow] = useState(true)
  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div>
        {show && <Son />}
        <button onClick={() => setshow(false)}>卸载</button>
      </div>
    </div>
  );
}

export default Demo6;
