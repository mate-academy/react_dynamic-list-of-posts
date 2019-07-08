import React from 'react';
import PropTypes from 'prop-types';

import './PostItem.css';
import CommentList from '../CommentsList/CommentsList';
import User from '../User/User';

const PostItem = ({ postItem, postAuthor, postComments }) => (
  <div className="post__container">
    <article className="post">
      <h2 className="post__title">{postItem.title}</h2>
      <p>{postItem.body}</p>

      <User user={postAuthor} />

    </article>
    <CommentList comments={postComments} />
  </div>
);

PostItem.propTypes = {
  postItem: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  postAuthor: PropTypes.object.isRequired,
  postComments: PropTypes.object.isRequired,
};
export default PostItem;
