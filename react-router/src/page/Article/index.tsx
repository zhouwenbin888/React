import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Article = () => {
    const [params]=useSearchParams()
    const id=params.get('id')
    const name=params.get('name')

    const paramss=useParams()
    const idd=paramss.id
    const namee=paramss.name
  return (
    <div>我是文章页{id}{idd}{namee}</div>
  )
}

export default Article