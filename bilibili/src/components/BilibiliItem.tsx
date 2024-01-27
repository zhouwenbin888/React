import{ useState } from 'react'
import { li } from './Binterface'
//从父组件中解构出传来的user, item, handleDelete
const BilibiliItem = ({ user, item, handleDelete }: li) => {

    const [count, setCount] = useState(item.like)
    const [isClicked, setIsClicked] = useState(true);

    const newcount = () => {
        if(isClicked){
            setCount(count + 1) 
            setIsClicked(!isClicked)
        }
    }
    
    return (<div className="reply-item">
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
                    <span className="reply-time">点赞数:{count}</span>
                    {user.uid === item.user.uid ? <span className="delete-btn" onClick={() => handleDelete(item.rpid)}>删除</span> : <span className='support-btn' onClick={newcount}>点赞</span>
                    }
                </div>
            </div>
        </div>
    </div>)
}

export default BilibiliItem