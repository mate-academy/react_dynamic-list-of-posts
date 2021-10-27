import React, { useState, useEffect } from 'react';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/post';

import './PostsList.scss';

type Props = {
  selectedUserId: number;
  selectedPostId: number,
  setPostId: (selectedPostId: number) => void,
};

export const PostsList: React.FC<Props> = ({ selectedUserId, selectedPostId, setPostId }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(postsFromServer => setPosts(postsFromServer));
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (selectedPostId === post.id) {
                  setPostId(0);
                } else {
                  setPostId(post.id);
                }
              }}
            >
              {selectedPostId !== post.id
                ? 'Open'
                : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
