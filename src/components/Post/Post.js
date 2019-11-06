import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import './post.css';

function Post({ post }) {
  return (
    <li className="post">
      <h1 className="post__heading heading">{post.title}</h1>
      <p className="post__text text">{post.body}</p>
      <User user={post.user} />
      <CommentList comments={post.comments} />
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      adress: PropTypes.shape({
        street: PropTypes.string.isRequired,
        suite: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
      }),
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      postID: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default Post;
