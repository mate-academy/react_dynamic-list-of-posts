import React from 'react';
import './CommentList.css';

export const Comment = props => {
   const {
       name,
       email,
       body,
   } = props;
   return (
       <div class = "comment">
            <p>
            <strong>Comments name:</strong>
            </p>
            <p>   
            {name}
            </p>
            <p>
            <strong>Email:</strong>
            </p>
            <p>
            {email}
            </p>
            <p>
            <strong>Content of comment:</strong>
            </p>
            <p>
            {body}
            </p>
       </div>
   );
};