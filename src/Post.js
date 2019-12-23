import React from 'react';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
import User from './User';

const Post = ({ post }) => (
  <div className="all">
    <ul className="post">
      <li className="post__title">
        {' '}
        {'🖋'}
        {' '}
        {' ' }
        {post.title}
      </li>
      <li className="post__body">{post.body}</li>
      <User user={post.user} />
      <CommentList comments={post.comments} />
    </ul>
  </div>
);

Post.propTypes
  = { post: PropTypes.objectOf(PropTypes.any).isRequired };
export default Post;
