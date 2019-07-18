import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './Commentlist';

const Post = ({ post }) => (
  <section className="post">
    <h2>
      {post.title}
    </h2>
    <p>
      {post.body}
    </p>
    <User user={post.user} />
    <CommentList comments={post.comments} />
  </section>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.object,
  }).isRequired,
};

export default Post;
