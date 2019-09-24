import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

const CommentsList = ({ comments }) => (
  comments.map(
    item => <Comment comment={item} user={item.user} key={item.id} />
  )
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
};

export default CommentsList;
