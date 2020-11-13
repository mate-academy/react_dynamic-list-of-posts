import React from 'react';
import './PostsList.scss';
import { Post } from '../Post/Post';

export const PostsList = React.memo(
// eslint-disable-next-line react/prop-types
  ({ posts, selectPost, selectedPost }) => {
    // eslint-disable-next-line no-console
    console.log('PostList');

    return (
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul className="PostsList__list">
          {/* eslint-disable-next-line react/prop-types */}
          {posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <Post
                {...post}
                selectPost={selectPost}
                selectedPost={selectedPost}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
