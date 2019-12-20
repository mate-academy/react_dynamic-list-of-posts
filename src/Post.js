import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './Comments';

const Post = ({ post }) => (
  <section className="post">
    <div className="post__content">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <User user={post.user} />
    </div>
    <CommentList postComments={post.commentsSet} />
    <hr />
  </section>
);

Post.propTypes
  = { post: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default Post;
