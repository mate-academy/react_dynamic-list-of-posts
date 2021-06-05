import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, postId, setPostId, selectOnePost }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              {`User #${post.userId}`}
            </b>
            {post.body}
          </div>
          {postId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setPostId(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                setPostId(post.id);
                selectOnePost(post.id);
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
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
  selectOnePost: PropTypes.func.isRequired,
};
