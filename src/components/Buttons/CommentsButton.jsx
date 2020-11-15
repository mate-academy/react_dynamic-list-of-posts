import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const CommentsButton = ({ commentsLength, toggleCommentVisibility }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {isClicked ? (
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsClicked(false);
            toggleCommentVisibility(false);
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
            toggleCommentVisibility(true);
          }}
        >
          {`Show ${commentsLength} comments`}
        </button>
      )}
    </>
  );
};

CommentsButton.propTypes = {
  commentsLength: PropTypes.number.isRequired,
  toggleCommentVisibility: PropTypes.func.isRequired,
};
