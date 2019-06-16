import React from 'react'
import Comment from './Comment';

function CommentList(props) {
  return (
    <div className="comments">
      {props.comments.map(item => (
        <Comment
          name={item.name}
          email={item.email}
          body={item.body}
          key={item.id}/>))}
    </div>)
  }


export default CommentList;
