import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, selectPost, postId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>{`[User#${post.userId}]:`}</b>
            {post.title}
          </div>
          {postId === post.id
            ? (
              <button
                id={post.id}
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  selectPost(0);
                }}
              >
                Close
              </button>
            )
            : (
              <button
                id={post.id}
                type="button"
                className="PostsList__button button"
                onClick={(e) => {
                  selectPost(+e.target.id);
                }}
              >
                Open
              </button>
            )}
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectPost: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
