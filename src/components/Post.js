import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ postOne }) => (
  <div className="post">
    <User userOne={postOne.user} />
    <p className="post-title">
      {'Post# - '}
      {postOne.id}
    </p>
    <p>
      {'Topic - '}
      {postOne.title}
    </p>
    <p>{postOne.body}</p>
    <CommentList commentOne={postOne.comments} />
  </div>
);

Post.propTypes = { postOne: PropTypes.objectOf(PropTypes.any).isRequired };

export default Post;
