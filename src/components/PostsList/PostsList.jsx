import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({
  posts,
  setSelectPostId,
  selectPostId,
}) => {
  const handleClick = (post) => {
    if (selectPostId === post.id) {
      setSelectPostId(0);
    } else {
      setSelectPostId(post.id);
    }
  };

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
            <button
              type="button"
              className="PostsList__button button"
              onClick={(() => handleClick(post))}
            >
              {selectPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectPostId: PropTypes.func.isRequired,
  selectPostId: PropTypes.number.isRequired,
};
