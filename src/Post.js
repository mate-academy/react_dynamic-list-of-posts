import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <div className="post">
    <h3 className="post--header">{post.title}</h3>
    <User user={post.user} />
    <p className="post--body">{post.body}</p>
    <CommentList comments={post.comments} />
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.object,
    title: PropTypes.string,
    body: PropTypes.string,
    commentsList: PropTypes.array,
  }).isRequired,
};

export default Post;
