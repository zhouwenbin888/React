import { getChannelAPI } from "@/apis/article"
import { Channel } from "@/pages/Publish"
import { useEffect, useState } from "react"


function useChannels() {
    const [channels, setchannels] = useState<Channel[]>([])
    useEffect(() => {
        const channel = async () => {
            const res = await getChannelAPI()
            setchannels(res.data.channels)
        }
        channel()
    }, [])
    return {channels}
}

export {useChannels}