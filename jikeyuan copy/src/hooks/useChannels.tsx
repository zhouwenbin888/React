import { Channel } from "@/pages/Publish"
import axios from "axios"
import { useEffect, useState } from "react"


function useChannels() {
    const [channels, setchannels] = useState<Channel[]>([])
    useEffect(() => {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://geek.itheima.net/v1_0/channels', false);  // 使用false表示同步请求
        request.send();

        if (request.status === 200) {
            setchannels(JSON.parse(request.responseText).data.channels);  // 更新channels状态值
        } else {
            console.error('Error fetching data: ', request.status);
        }

    }, [])
    return { channels }
}

export { useChannels }