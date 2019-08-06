import React from 'react';
import { User } from './User';
import { CommentList } from './CommentList';

export const Post = props => {
 const {
   id,
   title,
   user,
   body,
   comments,
 } = props;

  return (
    <div class = "post">   
      <p>
      <strong>Title of post:</strong>
      </p>
      <p>       
      {title}
      </p>
      <p>
      <strong>Post content:</strong>
      </p>
      <p>
      {body}
      </p>
      <p>
      <User key={props.id} {...user}/>
      </p>
      <p>
      <CommentList id={id} comments={comments}/>
      </p>
    </div>
  );
};