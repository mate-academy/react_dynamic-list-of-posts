import React from 'react';
import PropTypes from 'prop-types';
import CommentsList from '../Comments/CommentsList';
import User from '../User/User';
import './post.css';
import '../Comments/comments.css';

const Post = ({ post }) => (
  <section className="post">
    <h1 className="post__header">{post.title}</h1>
    <article>{post.body}</article>
    <div>
      <User info={post.user} />
    </div>
    <h3 className="post__comments comments">Comments</h3>
    <div>
      <CommentsList list={post.comments} />
    </div>
  </section>
);

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.object,
  }),
};

Post.defaultProps = { post: {} };

export default Post;
