import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import CommentList from './CommentList';

const Post = ({ postItem }) => (
  <div className="post">
    <h2 className="title_post">{postItem.title}</h2>
    <p>{postItem.body}</p>
    <p><User userItem={postItem} /></p>
    <p className="comment_tab">
      <CommentList listItems={postItem} />
    </p>
  </div>
);

Post.propTypes = {
  postItem: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Post;
