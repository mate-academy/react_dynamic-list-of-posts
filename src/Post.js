import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <div>
    <div className="PostList">
      <span className="PostList__user">
        <User user={post.user} />
      </span>
      <h3>
        {post.title}
      </h3>
    </div>
    <span>
      {post.body}
    </span>
    <span>
      <CommentList comments={post.comments} />
    </span>
  </div>

);

Post.propTypes = {
  post: PropTypes.shape(
    {
      user: PropTypes.string.isRequired,
      comments: PropTypes.array.isRequired,
      title: PropTypes.object.isRequired,
      body: PropTypes.string.isRequired,
    }
  ).isRequired,

};

export default Post;
