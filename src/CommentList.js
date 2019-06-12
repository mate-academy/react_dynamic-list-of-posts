import React from 'react';
import Comment from "./Comment.js";

function CommentList(props) {
  return props.comments.map((value) => {
  return <Comment key={value.id} comment={value}/>
  });
}

export default CommentList;
                            
