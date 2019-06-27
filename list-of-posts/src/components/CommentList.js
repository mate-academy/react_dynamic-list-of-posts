import React from 'react'
import Comment from './Comment'

export default function CommentList(props){
    return <div>
          <Comment comments={props.comments}/>
      </div>;
}
