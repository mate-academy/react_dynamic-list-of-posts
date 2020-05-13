
import React from 'react';
import { User } from './User';
import { PostPropsType } from './interfaces';
import { CommentsList } from './CommentsList';

export const Post: React.FC<PostPropsType> = ({ user, commentsList, post }) => {
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
          id={user[0].id}
          name={user[0].name}
          username={user[0].username}
          email={user[0].email}
          address={user[0].address}
        />
      </div>

      <CommentsList
        commentsList={commentsList}
      />

    </>
  );
};
