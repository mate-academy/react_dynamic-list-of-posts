import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentsList';
import '../App.css';

const Post = ({ dataPost }) => (
  <>
    <div className="card">
      <div className="header">
        <div className="icon">
          <a href="##"><i className="fa fa-heart-o" /></a>
        </div>
      </div>
      <div className="text">
        <User currentUser={dataPost.user} key={dataPost.user.id} />
        <h1 className="title">{dataPost.title}</h1>
        <p className="info">{dataPost.body}</p>
        <CommentList currentComment={dataPost.comments} />
      </div>
    </div>
  </>
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
