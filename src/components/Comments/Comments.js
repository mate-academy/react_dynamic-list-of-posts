import React from 'react';
import PropTypes from 'prop-types';
import SingleComment from '../SingleComment/SingleComment';

function Comments({ currentComments }) {
  return (
    <>
      {currentComments.map(comment => (
        <SingleComment
          key={comment.id}
          comment={comment}
        />
      ))}
    </>
  );
}

export default Comments;

Comments.propTypes = {
  currentComments: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
