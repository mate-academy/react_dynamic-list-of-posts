import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

import { getUserPosts } from '../../api/posts';

export const PostsList = ({ userId, getSelectedPostId, postId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(Number(userId))
      .then(postsFromServer => (
        setPosts(postsFromServer)
      ));
  }, []);

  useEffect(() => {
    getUserPosts(Number(userId)).then(postsFromServer => (
      setPosts(postsFromServer)
    ));
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {postId === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button button--selected"
                  onClick={() => {
                    getSelectedPostId(0);
                  }}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    getSelectedPostId(post.id);
                  }}
                >
                  Open
                </button>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.string.isRequired,
  getSelectedPostId: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
