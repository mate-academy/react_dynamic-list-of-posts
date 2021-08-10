import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, setPosts, showDetails }) => (

  <div className="PostsList">
    <h2>Posts:</h2>
    <ul className="PostsList__list">
      {posts ? posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
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
            onClick={() => showDetails(post.id)}
          >
            Open
          </button>
        </li>
      )) : ''}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      createdAt: PropTypes.string,
      id: PropTypes.number,
      title: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  ).isRequired,
  setPosts: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
};
