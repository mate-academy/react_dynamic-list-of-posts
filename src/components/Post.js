
import React from 'react';
import PropTypes from 'prop-types';

import CommentsList from './CommentsList';
import Authors from './Authors';

import './Post.css';

const Post = props => (
  <section className="post">
    <h3 className="post__header">{props.post.title}</h3>

    <div className="post__content-wrapper">
      <p className="post__body">
        {props.post.body}
      </p>

      <Authors
        key={props.post.user.id}
        user={props.post.user}
      />

      <CommentsList
        comments={props.post.postComments}
      />
    </div>
  </section>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    postComments: PropTypes.array,
  }).isRequired,
};

export default Post;
