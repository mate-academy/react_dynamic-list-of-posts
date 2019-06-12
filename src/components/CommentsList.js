import React from 'react';
import Comment from './Comment';
import {comments} from '../dataJSON/comments';

function CommentList(props) {
  return comments.map((commentItem) => {
    if(commentItem.postId === props.id) {
      return <Comment comment={commentItem} key={commentItem.name}/>
    }
  })
}

export default CommentList;
