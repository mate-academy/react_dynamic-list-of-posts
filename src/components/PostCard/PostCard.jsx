import React from 'react';
import PropTypes from 'prop-types';
import './PostCard.scss';

export const PostCard = ({ users, post, callBack }) => (

  <li className="post">
    <div className="post__image-container">
      <img className="post__image" src={post.image} alt="" />

    </div>
    <div className="post__info">
      <div className="post__title">
        {' '}
        {post.title}
      </div>
      <button
        type="button"
        className="button button--details"
        value={post.id}
        onClick={() => {
          const postAuthor = users.find(user => user.id === post.userId);

          callBack({
            post, postAuthor,
          });
        }}
      >
        READ MORE
      </button>
    </div>
  </li>
);

PostCard.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  callBack: PropTypes.func.isRequired,
};
