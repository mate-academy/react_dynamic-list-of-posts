import React from 'react';
import PropTypes from 'prop-types';

import './PostsList.scss';

export const PostsList = ({
  posts,
  selectedUser,
  selectedPost,
  setSelectedPost,
  isOpen,
  setIsOpen,
  setAreCommentsHidden,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map((post) => {
        if (
          selectedUser === '0'
            || +selectedUser === post.userId
        ) {
          return (
            <li
              className="PostsList__item"
              key={post.id}
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

              <button
                type="button"
                className={`PostsList__button button ${
                  (isOpen && +selectedPost.id === post.id)
                    ? 'PostsList__close-button'
                    : ''
                }`}

                onClick={() => {
                  if (selectedPost.id !== post.id) {
                    setSelectedPost(post);
                    setIsOpen(true);
                    setAreCommentsHidden(true);
                  } else {
                    setIsOpen(state => !state);
                  }
                }}
              >
                {(isOpen && +selectedPost.id === post.id) ? `Close` : `Open`}
              </button>
            </li>
          );
        }

        return (<></>);
      })}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUser: PropTypes.string.isRequired,
  selectedPost: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedPost: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setAreCommentsHidden: PropTypes.func.isRequired,
};
