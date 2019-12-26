import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

export default function Post({ title, body, user, commentsArray }) {
  return (
    <>
      <h3>
        {'Title: '}
        {title}
      </h3>
      <h4>
        {'Body: '}
        {body}
      </h4>
      <h4>
        {<User user={user} />}
      </h4>
      <h4>
        {<CommentList comments={commentsArray} />}
      </h4>
      <br />
    </>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.objectOf.isRequired,
  commentsArray: PropTypes.arrayOf.isRequired,
};
