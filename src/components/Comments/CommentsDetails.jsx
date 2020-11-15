import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CommentsButton } from '../Buttons/CommentsButton';
import { CommentsList } from './CommentsList';

export const CommentsDetails = ({ commentsLength, comments, remove }) => {
  const [commentsVisibility, setCommentsVisibility] = useState(true);

  const toggleCommentVisibility = () => {
    setCommentsVisibility(!commentsVisibility);
  };

  return (
    <section className="PostDetails__comments">
      <CommentsButton
        commentsLength={commentsLength}
        toggleCommentVisibility={toggleCommentVisibility}
      />
      {!commentsVisibility && (
        <CommentsList
          comments={comments}
          remove={remove}
        />
      )}
    </section>
  );
};

CommentsDetails.propTypes = {
  commentsLength: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  remove: PropTypes.func.isRequired,
};
