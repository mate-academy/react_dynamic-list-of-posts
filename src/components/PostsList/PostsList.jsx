import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ select, posts, showPostInfo, postSelected }) => {
  const filterList = useMemo(() => (
    select === '0'
      ? posts
      : posts.filter(post => post.userId === +select)
  ), [select, posts]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {filterList.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            <button
              type="button"
              value={post.id}
              className="PostsList__button button"
              onClick={showPostInfo}
            >
              {+postSelected === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  select: PropTypes.string.isRequired,
  showPostInfo: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  postSelected: PropTypes.string.isRequired,
};
