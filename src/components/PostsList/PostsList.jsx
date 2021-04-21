import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';
import classNames from 'classnames/bind';

export const PostsList = ({ posts, fetchPostId }) => {
  const [postId, setPostId] = useState('');

  const onOpenHandler = (postID) => {
    setPostId(postID);
    fetchPostId(postID);
  };

  return (
    <div className="PostsList">
      <h2>
        Posts:
        {' '}
        {posts.length}
      </h2>

      <ul className="PostsList">
        {posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className={classNames(
                'PostsList__button',
                'button',
                { Active: post.id === postId },
              )}
              onClick={() => onOpenHandler(post.id === postId ? 0 : post.id)}
            >
              {post.id !== postId ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  fetchPostId: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string || null.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
};
