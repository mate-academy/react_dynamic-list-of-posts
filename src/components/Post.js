import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

export default function Post(props) {
  return (
    <>
      <h3>
        {'Title: '}
        {props.post.title}
      </h3>
      <h4>
        {'Body: '}
        {props.post.body}
      </h4>
      <h4>
        {<User user={props.post.user} />}
      </h4>
      <h4>
        {<CommentList comments={props.post.commentsArray} />}
      </h4>
      <br />
    </>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    commentsArray: PropTypes.arrayOf,
  }).isRequired,
};
