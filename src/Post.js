
import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <article className="PostList__items">
    <div className="title-group">
      <span className="PostList__user">
        <User user={post.user} />
      </span>
      <span className="title">
        {post.title}
      </span>
    </div>
    <span>
      {post.body}
    </span>
    <span>
      <CommentList comments={post.comments} />
    </span>
  </article>

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
