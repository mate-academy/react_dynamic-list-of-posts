import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentsList from './CommentsList';

const Post = ({ data: { title, body, user, comments } }) => (
  <>
    <h2>{title}</h2>
    <p>{body}</p>
    <p className="author">
      <User userData={user} />
    </p>
    <h3>Comments:</h3>
    <CommentsList commentsData={comments} />
  </>
);

Post.propTypes
= { data: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default Post;
