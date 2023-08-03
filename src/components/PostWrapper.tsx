import React from 'react';
import { UserProvider } from '../context/user.context';
import PostWidget from './PostWidget';
import { PostProvider } from '../context/post.context';
import PostSidebar from './PostSidebar';

const PostWrapper:React.FC = () => {
  return (
    <UserProvider>
      <PostProvider>
        <div className="tile is-ancestor">
          <PostWidget />

          <PostSidebar />
        </div>
      </PostProvider>
    </UserProvider>
  );
};

export default PostWrapper;
