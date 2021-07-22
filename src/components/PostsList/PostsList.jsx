import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPostsUser } from '../../api/posts';
import './PostsList.scss';

export const PostsList = ({ userId, selectedPostId, setPostId }) => {
  const [posts, setPosts] = useState('');

  useEffect(() => {
    getPostsUser(userId)
      .then((response) => {
        setPosts(response);
      });
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts && posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>[User #{userId}]:</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (selectedPostId === post.id) {
                  return setPostId(0);
                }

                setPostId(post.id);
              }}
            >
              {selectedPostId === post.id ? 'close' : 'open'}
            </button>
          </li>
        ))}

        {/* <li className="PostsList__item">
          <div>
            <b>[User #2]: </b>
            et ea vero quia laudantium autem
          </div>

          <button
            type="button"
            className="PostsList__button button"
          >
            Open
          </button>
        </li> */}
      </ul>
    </div>
  );
};
