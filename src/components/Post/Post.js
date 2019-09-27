import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import './Post.css';

function Post({ post }) {
  const {
    title, body, user, comments,
  } = post;

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      <hr />
      <User user={user} />
      <CommentList comments={comments} />
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Post;
