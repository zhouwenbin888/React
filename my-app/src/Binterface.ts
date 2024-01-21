export interface Comment {
    rpid: string
    user: User,
    content: string,
    ctime: string,
    like: number,
}
export interface User {
    uid: string,
    avatar: string,
    uname: string,
}
export interface li {
    user: User
    item: Comment
    handleDelete: (id: string) => void
}
export interface Bprops {
    name: string
}