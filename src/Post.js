import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ postData }) => (
  <div className="all">
    <ul className="post">
      <li className="post__title">
        {' '}
        {'🖋'}
        {' '}
        {' ' }
        {postData.title}
      </li>
      <li className="post__body">{postData.body}</li>
      <User user={postData.user} />
      <CommentList comments={postData.comments} />
    </ul>
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
