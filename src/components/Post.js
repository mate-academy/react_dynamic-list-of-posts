import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ postData }) => (
  <div className="post">
    <User userOne={postData.user} />
    <p className="post-title">
      {'Post# - '}
      {postData.id}
    </p>
    <p>
      {'Topic - '}
      {postData.title}
    </p>
    <p>{postData.body}</p>
    <CommentList comments={postData.comments} />
  </div>
);

Post.propTypes = {
  postData: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
