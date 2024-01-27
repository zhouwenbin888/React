import { useEffect, useRef, useState } from 'react'
import '../css/Bilibili.css'
import _ from 'lodash'
import classnames from 'classnames'
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'
import axios from 'axios'
import BilibiliItem from './BilibiliItem'
import { User, Comment, Bprops } from './Binterface'

const user: User = {
    uid: '30009257',
    avatar: '',
    uname: 'hubu',
}
const tabs = [
    { type: 'hot', text: '最热' },
    { type: 'time', text: '最新' },
]

function useGetlist() {
    const [commentList, setCommentList] = useState<Comment[]>([])
    useEffect(() => {
        async function getList() {
            const res = await axios.get('http://localhost:3001/list')
            setCommentList(_.orderBy(res.data, 'like', 'desc'))
        }
        getList()
    }, [])
    return { commentList, setCommentList }
}

const Bilibilicomment = (props: Bprops) => {
    const { commentList, setCommentList } = useGetlist()
    const [value, setValue] = useState<string>('')
    const [type, setType] = useState<string>('hot')
    const inputRef = useRef<HTMLInputElement>(null)
    const update=()=>{
        const newComment={
            rpid: uuidV4(),
            user: {
                uid: '30009257',
                avatar: 'http://toutiao.itheima.net/resources/images/98.jpg',
                uname: props.name,
            },
            content: value,
            ctime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            like: 0,
        } 
        setValue('');
        inputRef.current?.focus();
        setCommentList([...commentList, newComment]);
        const sortedCommentList = _.orderBy([...commentList, newComment],type === 'hot' ? 'like' : 'ctime','desc');
        setCommentList(sortedCommentList);
    }
    const handleDelete = (id: string) => {
        setCommentList(commentList.filter(item => item.rpid !== id))
    }

    const handleClick = (type: string) => {
        setType(type)
        if (type === 'hot') {
            setCommentList(_.orderBy(commentList, 'like', 'desc'))
        } else if (type === 'time') {
            setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
           update()
        }
    };

    const handleComment = () => {
        if (value !== '') {
            update()
        }
    }

    return (
        <div className="app">
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        <span className="total-reply">{commentList.length}</span>
                    </li>
                    <li className="nav-sort">
                        {tabs.map(item => (
                            <span
                                className={classnames('nav-item', { 'active': type === item.type })}
                                key={item.type}
                                onClick={() => handleClick(item.type)}
                            >
                                {item.text}
                            </span>
                        ))}
                    </li>
                </ul>
            </div>
            <div className="reply-wrap">
                <div className="box-normal">
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src="http://toutiao.itheima.net/resources/images/98.jpg" alt="用户头像" />
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        <input
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                            value={value}
                            ref={inputRef}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="reply-box-send">
                            <div className="send-text" onClick={handleComment} >发布</div>
                        </div>
                    </div>
                </div>
                <div className="reply-list">
                    {commentList.map(item => (<BilibiliItem key={item.rpid} user={user} item={item} handleDelete={handleDelete} />))}
                </div>
            </div>
        </div>
    )
}

export default Bilibilicomment;