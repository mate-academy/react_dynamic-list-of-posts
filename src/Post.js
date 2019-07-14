import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ dataPost }) => (
  <div className="App__data--post">
    <User currentUser={dataPost.user} key={dataPost.user.id} />
    <h1 className="App__title">{dataPost.title}</h1>
    <p className="App__body">{dataPost.body}</p>
    <CommentList currentComment={dataPost.comments} />
  </div>
);

Post.propTypes = {
  dataPost: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.object,
  }).isRequired,
};

export default Post;
