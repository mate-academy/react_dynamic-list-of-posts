import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ postItem }) => (
  <div className="post">
    <h3 className="post__title">{postItem.title}</h3>
    <p className="post__body">{postItem.body}</p>
  </div>
);

Post.propTypes = {
  postItem: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Post;
