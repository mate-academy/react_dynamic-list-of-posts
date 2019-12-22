import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post }) => {
  const { title, body, user, commentList } = post;

  return (
    <div
      className="flip-container"
      onTouchStart="this.classList.toggle('hover');"
    >
      <div className="flipper">
        <div className="front">
          <h2 className="front-heading">{title}</h2>
          <p className="front-body">{ `"${body}"`}</p>
          <User user={user} />
        </div>
        <div className="back">
          <p className="back-heading">Comments:</p>
          <CommentList comments={commentList} />
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({}).isRequired,
    commentList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  }).isRequired,
};

export default Post;
