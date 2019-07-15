import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <div>
    <div className="post">
      <div className="post__title">{post.title}</div>
      <p className="post__body">
        {post.body}
      </p>
      <User user={post.user} />
    </div>
    <CommentList allComments={post.comment} />
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.object,
    comment: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Post;
