import React from 'react';
import PropTypes from 'prop-types';

import './PostItem.css';
import CommentList from '../CommentsList/CommentsList';
import User from '../User/User';

const PostItem = ({ post }) => (
  <div className="post__container">
    {console.log(post.postItem)}
    <article className="post">
      <h2 className="post__title">{post.postItem.title}</h2>
      <p>{post.postItem.body}</p>

      <User user={post.postAuthor} />

    </article>
    <CommentList comments={post.postComments} />
  </div>
);

PostItem.propTypes = {
  post: PropTypes.shape({
    postItem: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
    }),
    postAuthor: PropTypes.object,
    postComments: PropTypes.object,
  }).isRequired,
};
export default PostItem;
