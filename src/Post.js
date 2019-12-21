import React from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
import User from './User';

const Post = ({ post }) => (
  <div className="post">
    <p className="title">{post.title}</p>
    <p>{post.body}</p>
    <div className="user">
      <User post={post} />
    </div>
    <ul>
      <p className="title-comment">Comments</p>
      <CommentList comments={post.comments} />
    </ul>
  </div>
);

Post.propTypes = {
  post: PropTypes.oneOfType([PropTypes.string,
    PropTypes.number,
  ])
    .isRequired,
};

export default Post;
