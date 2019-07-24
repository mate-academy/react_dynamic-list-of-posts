import React from 'react';
import PropTypes from 'prop-types';
import Users from './Users';
import CommentList from './CommentList';

function Posts({ posts }) {
  return (
    <div className="posts">
      <p className="posts__title alert alert-warning">
        News
        {posts.id}
        <br />
        {posts.title}
      </p>
      <p className="posts__body alert alert-info">
        About news
        {posts.id}
        <br />
        {posts.body}
      </p>
      <Users users={posts.user} />
      <p>Comments</p>
      <CommentList currentComments={posts.comments} />
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
  }).isRequired,
};
export default Posts;
