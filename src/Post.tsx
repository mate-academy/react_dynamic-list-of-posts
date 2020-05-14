
import React from 'react';
import { User } from './User';
import { PostPropsType } from './interfaces';
import { CommentsList } from './CommentsList';

export const Post: React.FC<PostPropsType> = ({ post }) => {
  return (
    <>
      <div>
        <h2>
          <strong>
            {post.title}
          </strong>
        </h2>
        <p>{post.body}</p>
        <User
          user={post.user}
        />
      </div>

      <CommentsList
        commentsList={post.commentsList}
      />

    </>
  );
};
