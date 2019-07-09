import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

const CommentList = ({ allComments }) => (
  allComments.map(comment => (
    <Comment commentItem={comment} key={comment.id} />
  ))
);

CommentList.propTypes = {
  allComments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
