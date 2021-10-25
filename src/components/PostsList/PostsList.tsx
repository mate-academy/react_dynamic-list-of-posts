import React, { useState, useEffect } from 'react';

import './PostsList.scss';

import { getUserPosts } from '../../api/posts';

import { Loader } from '../Loader';

type Props = {
  selectedUserId: number;
  selectPost: React.Dispatch<React.SetStateAction<number>>;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId, selectPost, selectedPostId,
}) => {
  const [posts, setPosts] = useState([] as PostTypes[]);
  const [loading, setLoadingStatus] = useState(true);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(res => {
        setPosts(res);
        setLoadingStatus(false);
      });
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
      {loading && (
        <Loader />
      )}
      <ul className="PostsList__list">
        {posts.map((post: PostTypes) => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`[User #${post.userId}]: `}</b>
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
