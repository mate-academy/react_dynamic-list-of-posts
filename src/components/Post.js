import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ postItem }) => (
  <div className="post">
    <h2 className="title_post">{postItem.title}</h2>
    <p>{postItem.body}</p>
  </div>
);

Post.propTypes = {
  postItem: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Post;
