import React from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentsList';
import User from './User';

function Post({
  post: {
    title, body, user, comments,
  },
}) {
  return (
    <div className="card">
      <div className="header">
        <div className="icon">
          <span><i className="fa fa-heart-o" /></span>
        </div>
      </div>
      <User user={user} />
      <div className="text">
        <p className="title">{title}</p>
        <p className="info">{body}</p>
        <p className="comments">Comments</p>
        <CommentList commentList={comments} />
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Post;
