import React from 'react';
import { Comment } from './Comment';

export const CommentList = props => {
  const {
    id,
    comments
  } = props;
    let arrForId = comments.filter(function (comment, i, comments){
      return comment.postId === id;
    });
  return (
    <div >
    {arrForId.map((comment, i) => {
      return (
        <Comment body={comment.body} name={comment.name} email={comment.email}/>
      );
    })}
    </div>
  );
};