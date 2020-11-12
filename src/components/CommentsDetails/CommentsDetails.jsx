import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonShowHide } from '../ButtonShowHide';
import { CommentsList } from '../CommentsList';

export const CommentsDetails = ({ commentsLength, comments, remove }) => {
  const [isShowedComments, setIsShowedComments] = useState(false);

  const isShowedCommentsOnClick = (bool) => {
    setIsShowedComments(bool);
  };

  return (
    <section className="PostDetails__comments">
      <ButtonShowHide
        commentsLength={commentsLength}
        isShowedCommentsOnClick={isShowedCommentsOnClick}
      />

      {isShowedComments && (
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
