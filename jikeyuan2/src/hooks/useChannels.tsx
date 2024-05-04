import { Channel } from "@/pages/Publish"
import axios from "axios"
import { useEffect, useState } from "react"


function useChannels() {
    const [channels, setchannels] = useState<Channel[]>([])
    useEffect(() => {
        axios.get('http://geek.itheima.net/v1_0/channels')
            .then(res => {
                setchannels(res.data.data.channels)
            })
    }, [])
    return { channels }
}

export { useChannels }