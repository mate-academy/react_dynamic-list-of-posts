import React from 'react'
import Comment from './Comment'

export default function CommentList(props){
    return <Comment comments={props.comments}/>
}
