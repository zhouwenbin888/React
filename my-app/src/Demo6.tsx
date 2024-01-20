import React, { useEffect, useState } from 'react';

const URL = 'http://geek.itheima.net/v1_0/channels';

interface Channel {
  id: number;
  name: string;
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

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Demo6;
