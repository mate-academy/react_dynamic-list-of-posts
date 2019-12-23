import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post }) => (
  <section className="post">
    <article className="post__content">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <User user={post.user} />
    </article>
    <CommentList comments={post.postComments} />
    <hr />
  </section>
);

Post.propTypes
  = { post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    postComments: PropTypes.array.isRequired,
  }).isRequired };

export default Post;
