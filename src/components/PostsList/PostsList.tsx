/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import './PostsList.scss';

import { getAllPosts, getUserPosts } from '../../api/posts';
import { Loader } from '../Loader';

type Props = {
  selectedUser: number,
  setSelectedPostId: (arg: number | null) => void,
  selectedPostId: number | null,
};

export const PostsList: React.FC<Props> = ({ selectedUser, selectedPostId, setSelectedPostId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  const loadAllPosts = async () => {
    try {
      const allPosts = await getAllPosts();

      setError('');
      setPosts(allPosts);
    } catch (err) {
      setError(`${err}`);
    }
  };

  const loadUserPosts = async () => {
    const userPosts = await getUserPosts(selectedUser);

    setPosts(userPosts);
  };

  useEffect(() => {
    if (selectedUser === 0) {
      loadAllPosts();
    } else {
      loadUserPosts();
    }
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <h2>{error}</h2>

      {(posts.length === 0) ? (
        <Loader />
      ) : (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>{`User #${post.userId}: `}</b>
                {post.title}
              </div>

              {(selectedPostId === post.id) ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setSelectedPostId(null)}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setSelectedPostId(post.id)}
                >
                  Open
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
