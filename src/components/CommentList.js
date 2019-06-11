import React from 'react';
import Comment from './Comment';

export default function CommentList(props) {
  const comments = props.commentsInfo.map(comment => {
      return (
        <Comment
          name={comment.name}
          email={comment.email}
          body={comment.body}
          key={comment.id}
        />
      );
    })
  
  return (
    <div className='comments'>
      {comments}
    </div>
  );
}
