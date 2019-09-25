import React from 'react';
import './Post.css';
import PropTypes from 'prop-types';
import CommentList from '../CommentList/CommentList';
import User from '../User/User';

const Post = ({ post }) => {
  const {
    title, body, comments, user,
  } = post;
  const upperTitle = `${title.slice(0, 1).toUpperCase()}${title.slice(1)}`;

  return (
    <div className="post">
      <h2 className="post-title">{upperTitle}</h2>
      <p className="post-text">{body}</p>
      <User user={user} />
      <p className="comments">Comments:</p>
      <CommentList comments={comments} />
    </div>
  );
};

const postProps = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
}).isRequired;

Post.propTypes = {
  post: postProps.isRequired,
};

export default Post;
