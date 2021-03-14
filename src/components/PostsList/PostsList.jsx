import React from 'react';
import PropTypes from 'prop-types';
import './PostsList.scss';

export const PostsList = ({ posts, postId, setPostId }) => {
  const clickHandler = (id) => {
    if (postId === id) {
      setPostId(0);

      return;
    }

    setPostId(id);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>
                  {`[User #${post.userId}]: `}
                </b>
                {['this is post id --> to delete', `${post.id}  `, post.title]}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  clickHandler(post.id);
                }}
              >
                {postId === post.id
                  ? 'Close'
                  : 'Open'
                }
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    PostId: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
  postId: PropTypes.number.isRequired,
  setPostId: PropTypes.func.isRequired,
};
