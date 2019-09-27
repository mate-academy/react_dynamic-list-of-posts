import React from 'react';
import './Post.css';
import PropTypes from 'prop-types';
import CommentList from '../CommentList/CommentsList';
import User from '../User/User';

function Post({ post }) {
  const { title, body, comments } = post;

  return (
    <ul className="list-group post">
      <p className="list-group-item list-group-item-primary post__head">
        {title}
      </p>
      <p className="list-group-item list-group-item-primary post__body">
        {body}
      </p>
      <User user={post.user} />
      <CommentList comments={comments} />
    </ul>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.shape({
        street: PropTypes.string,
        suite: PropTypes.string,
        city: PropTypes.string,
      }),
    }),
    comments: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      body: PropTypes.string,
      email: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    })),
  }).isRequired,
};

export default Post;
