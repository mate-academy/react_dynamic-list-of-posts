import React, { useState } from 'react';
import './PostsList.scss';
import PropTypes from 'prop-types';
import { PostType } from '../../types';
import { getPostDetails } from '../../api/posts';

export const PostsList = ({
  posts,
  selectPost,
}) => {
  const [currentPostId, setCurrentPostId] = useState(0);

  const setCurrentPost = (postId) => {
    setCurrentPostId(postId);
    getPostDetails(postId)
      .then(post => selectPost(post));
  };

  return (
    <div className="PostsList">
      <h2>
        {`Posts: ${posts.length}`}
      </h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={
                currentPostId === post.id
                  ? () => setCurrentPost(0)
                  : () => setCurrentPost(post.id)
              }
            >
              {currentPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PostType,
  ).isRequired,
  selectPost: PropTypes.func.isRequired,
};
