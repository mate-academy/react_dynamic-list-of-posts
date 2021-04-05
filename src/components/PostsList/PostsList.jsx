import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ selectedPostId, setSelectedPostId }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async() => {
    const response = await getUserPosts();

    setPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setSelectedPostId(null);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  setSelectedPostId(post.id);
                }}
              >
                Open
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
