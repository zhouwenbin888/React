// 封装获取频道列表的逻辑
import { useState, useEffect } from 'react'
function useChannel() {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://geek.itheima.net/v1_0/channels', false);  // 使用false表示同步请求
    request.send();

    if (request.status === 200) {
      setChannelList(JSON.parse(request.responseText).data.channels)
      // 更新channels状态值
    } else {
      console.error('Error fetching data: ', request.status);
    }

  }, [])
  return { channelList }
}

export { useChannel }