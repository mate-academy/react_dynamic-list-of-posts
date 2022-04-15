import React, { useState, useEffect } from 'react';
import './PostsList.scss';

import { getUserPosts } from '../../api/post';

interface State {
  selectedUserId: number,
  selectedPostId: number | null,
  handlePostId: (value: number | null) => void,
}

export const PostsList: React.FC<State> = ({ selectedUserId, selectedPostId, handlePostId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(result => setPosts(result));
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => {
          const isPostSelected = post.id === selectedPostId;

          return (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`[User #${post.userId}]:`}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  handlePostId(isPostSelected ? null : post.id);
                }}
              >
                {isPostSelected ? 'Close' : 'Open'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
