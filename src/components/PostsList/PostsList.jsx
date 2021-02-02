import React, { useState, useEffect } from 'react';
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
}) => {
  const [postsToShow, setPostsToShow] = useState(posts);

  useEffect(() => {
    setPostsToShow(posts.filter(
      post => selectedUser === '0' || +selectedUser === post.userId
    ));
  }, [selectedUser, posts]);

  function openClose(post, selectedPostId, postId) {
    if (selectedPostId !== postId) {
      setSelectedPost(post);
      setIsOpen(true);
      setAreCommentsHidden(true);
    } else {
      setIsOpen(state => !state);
    }
  }

  console.log(selectedPost);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postsToShow.map((post) => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div >
              <div className='PostsList__username-text'>
                [User #
                {post.userId}
                ]:
              </div>
              {' '}
              {post.title}
            </div>

            <button
              type="button"
              className={`PostsList__button button ${
                (isOpen && +selectedPost.id === post.id)
                  ? 'PostsList__close-button'
                  : ''
              }`}

              onClick={() => openClose(post, selectedPost.id, post.id)}
            >
              {(isOpen && +selectedPost.id === post.id) ? `Close` : `Open`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUser: PropTypes.string.isRequired,
  selectedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedPost: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setAreCommentsHidden: PropTypes.func.isRequired,
};
