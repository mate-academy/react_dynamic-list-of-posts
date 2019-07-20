import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ listItems }) => (
  listItems.comments.map(item => <Comment commentItem={item} />)
);

CommentList.propTypes = {
  listItems: PropTypes.shape({
    comments: PropTypes.array,
  }).isRequired,
};

export default CommentList;
