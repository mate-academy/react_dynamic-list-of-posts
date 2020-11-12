import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CommentList } from '../CommentList';

export const CommentInfo = ({
  commentsLength,
  comments,
  remove,
}) => {
  const [displayComments, setDisplayComments] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const displayCommentsOnClick = (bool) => {
    setDisplayComments(bool);
  };

  return (
    <section className="PostDetails__comments">
      {isClicked ? (
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsClicked(false);
            displayCommentsOnClick(false);
          }}
        >
          {`Hide ${commentsLength} comments`}
        </button>
      ) : (
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsClicked(true);
            displayCommentsOnClick(true);
          }}
        >
          {`Show ${commentsLength} comments`}
        </button>
      )}

      {displayComments && (
        <CommentList
          comments={comments}
          remove={remove}
        />
      )}
    </section>
  );
};

CommentInfo.propTypes = {
  commentsLength: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  remove: PropTypes.func.isRequired,
};
