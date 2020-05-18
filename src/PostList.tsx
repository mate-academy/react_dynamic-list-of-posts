import React from 'react';
import { Posts } from './helper';
import Post from './Post';

type Props = {
  posts: Posts[];
};

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <>

      <>
        <ul>
          {posts.map(post => (
            <li>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </>
    </>
  );
};

export default PostList;
