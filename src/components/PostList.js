import React from 'react';
import { Post } from "./Post";

export const PostList = props => {
  const {
    postsWithUsers,
    comments
  } = props;
    
  return (
    <div>
      {postsWithUsers.map((postsWithUser) => {
        return (
          <Post key={postsWithUser.id} {...postsWithUser} comments={comments}/>
        );
      })}
    </div>
    );
  };
