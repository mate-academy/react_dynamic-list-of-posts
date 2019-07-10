import React from 'react';
import PropTypes from 'prop-types';
import User from '../User';
import CommentList from '../CommentList/CommentList';
import './post.css';

const Post = ({ title, body, comments, user }) => (
  <div className="post-page">
    <User {...user} />

    <div className="post-page__post">
      <h2>{title}</h2>
      <div>{body}</div>
      <CommentList comments={comments} />
    </div>
  </div>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
      body: PropTypes.string,
    })
  ),
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
};

Post.defaultProps = {
  comments: null,
};

export default Post;
