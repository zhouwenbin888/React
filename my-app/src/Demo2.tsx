import { useRef, useState } from 'react'
import './Demo2.css'
import _ from 'lodash'
import classnames from 'classnames'
import { v4 as uuidV4 } from 'uuid'
import dayjs from 'dayjs'

interface User {
    uid: string,
    avatar: string,
    uname: string,
}

interface Comment {
    rpid: string
    user: User,
    content: string,
    ctime: string,
    like: number,
}

const defaultList: Comment[] = [
    {
        rpid: '3',
        user: {
            uid: '13258165',
            avatar: 'logo192.png',
            uname: '周杰伦',
        },
        content: '哎哟，不错哦',
        ctime: '10-18 08:15',
        like: 88,
    },
    {
        rpid: '2',
        user: {
            uid: '36080105',
            avatar: 'logo192.png',
            uname: '许嵩',
        },
        content: '我寻你千百度 日出到迟暮',
        ctime: '11-13 11:29',
        like: 888,
    },
    {
        rpid: '1',
        user: {
            uid: '30009257',
            avatar: 'logo192.png',
            uname: '黑马前端',
        },
        content: '学前端就来黑马',
        ctime: '10-19 09:00',
        like: 66,
    },
]

const user: User = {
    uid: '30009257',
    avatar: '',
    uname: '黑马前端',
}

const tabs = [
    { type: 'hot', text: '最热' },
    { type: 'time', text: '最新' },
]
interface Demo2Props {
    name: string;
}
const Demo2 = (props: Demo2Props) => {
    const [commentList, setCommentList] = useState<Comment[]>(_.orderBy(defaultList, 'like', 'desc'))
    const [value, setValue] = useState<string>('')
    const [type, setType] = useState<string>('hot')
    const inputRef = useRef<HTMLInputElement>(null)

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
            setCommentList([...commentList, {
                rpid: uuidV4(),
                user: {
                    uid: '30009257',
                    avatar: 'logo192.png',
                    uname: props.name,
                },
                content: value,
                ctime: dayjs(new Date()).format('MM-DD hh:mm'),
                like: 66,
            }])
            setValue('')
            inputRef.current?.focus()
        }
    };
    const handleComment = () => {
        console.log(props.name)
        setCommentList([...commentList, {
            rpid: uuidV4(),
            user: {
                uid: '30009257',
                avatar: 'logo192.png',
                uname: props.name,
            },
            content: value,
            ctime: dayjs(new Date()).format('MM-DD hh:mm'),
            like: 66,
        }])
        setValue('')
        inputRef.current?.focus()
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
                            <img className="bili-avatar-img" src="logo192.png" alt="用户头像" />
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
                            <div className="send-text" onClick={handleComment}>发布</div>
                        </div>
                    </div>
                </div>
                <div className="reply-list">
                    {commentList.map(item => (
                        <div className="reply-item" key={item.rpid}>
                            <div className="root-reply-avatar">
                                <div className="bili-avatar">
                                    <img className="bili-avatar-img" src={item.user.avatar} alt="用户头像" />
                                </div>
                            </div>
                            <div className="content-wrap">
                                <div className="user-info">
                                    <div className="user-name">{item.user.uname}</div>
                                </div>
                                <div className="root-reply">
                                    <span className="reply-content">{item.content}</span>
                                    <div className="reply-info">
                                        <span className="reply-time">{item.ctime}</span>
                                        <span className="reply-time">点赞数:{item.like}</span>
                                        {user.uid === item.user.uid && (
                                            <span className="delete-btn" onClick={() => handleDelete(item.rpid)}>
                                                删除
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Demo2;