import React from 'react';
import PropTypes from 'prop-types';
import { TypePost } from '../../types';

export const Post = ({
  selectedPost,
  post,
  handleClick,
}) => {
  const clickHandlerOpen = (postOnSelection) => {
    handleClick(postOnSelection);
  };

  const clickHandlerClose = () => {
    handleClick({});
  };

  return (
    <li className="PostsList__item">
      <div>
        <b>
          [User #
          {post.userId}
          ]:
          {' '}
        </b>
        {post.title}
      </div>

      {(selectedPost.id !== post.id)
        ? (
          <button
            onClick={() => {
              clickHandlerOpen(post);
            }}
            type="button"
            className="PostsList__button button"
          >
            Open
          </button>
        )
        : (
          <button
            onClick={() => {
              clickHandlerClose();
            }}
            type="button"
            className="PostsList__button button"
          >
            Close
          </button>
        )
      }
    </li>
  );
};

Post.propTypes = {
  selectedPost: TypePost.isRequired,
  post: TypePost.isRequired,
  handleClick: PropTypes.func.isRequired,
};
