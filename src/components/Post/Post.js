import React from 'react';
import PropTypes from 'prop-types';
import './Post.css';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';

function Post({ post }) {
  const { title, body, comments } = post;

  return (
    <div className="post">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        <User user={post.user} />
      </div>

      <CommentList comments={comments} />
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.string,
  }).isRequired,
};

export default Post;
