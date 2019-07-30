import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import CommentList from './CommentList';

function Post({ post }) {
  return (
    <div>
      <User user={post.user} />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <CommentList commentList={post.comments} />
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    comments: PropTypes.objectOf(PropTypes.array).isRequired,
  }).isRequired,
};

export default Post;
