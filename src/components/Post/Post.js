import React from 'react';
import './Post.css';
import PropTypes from 'prop-types';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';

function Post({ post, user, comments }) {
  return (
    <div className="post">
      <User user={user} />
      <div className="post-content">
        <h1 className="post__title">{post.title}</h1>
        <p className="post__body">{post.body}</p>
      </div>
      <h2 className="desription">Comments:</h2>
      <CommentList
        comments={comments.filter(comment => comment.postId === post.id)}
      />
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string,
      city: PropTypes.string.isRequired,
      zipcode: PropTypes.string,
    }),
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number,
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string,
    })
  ),
};

export default Post;
