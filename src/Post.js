import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ dataPost }) => (
  <div className="app__data--post">
    <User preparedUser={dataPost.user} key={dataPost.user.id} />
    <h1 className="app__title">{dataPost.title}</h1>
    <p className="app__body">{dataPost.body}</p>
    <CommentList preparedComment={dataPost.comments} />
  </div>
);

Post.propTypes = {
  dataPost: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.array,
  }).isRequired,
};

export default Post;
