import React from 'react';
import './Post.css';
import PropTypes from 'prop-types';
import CommentList from '../CommentsList/CommentsList';
import User from '../User/User';

const Post = ({ post }) => (
  <div className="ui raised link card">
    <User {...post.user} />
    <div className="content">
      <div className="header">{post.title}</div>
      <div className="description">{post.body}</div>
    </div>
    <CommentList comments={post.comments} key={post.comments.id} />
  </div>
);

Post.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};

export default Post;
