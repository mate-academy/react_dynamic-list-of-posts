import React, { useState, useEffect } from 'react';

import './PostsList.scss';

import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/post';

type Props = {
  selectedUserId: number,
  selectedPostId: number,
  selectPost: (value: number) => void;
};

export const PostsList: React.FC<Props> = ({ selectedUserId, selectedPostId, selectPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(postsFromServer => setPosts(postsFromServer));
  }, [selectedUserId]);

  const handleChange = (id: number) => {
    if (id === selectedPostId) {
      selectPost(0);
    } else {
      selectPost(id);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map((post) => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              {`[User #${post.userId}]: `}
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleChange(post.id)}
            >
              {selectedPostId === post.id ? (
                'Close'
              ) : (
                'Open'
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
