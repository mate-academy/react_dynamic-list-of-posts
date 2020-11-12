import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ButtonShowHide = ({
  commentsLength,
  isShowedCommentsOnClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {isClicked ? (
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsClicked(false);
            isShowedCommentsOnClick(false);
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
            isShowedCommentsOnClick(true);
          }}
        >
          {`Show ${commentsLength} comments`}
        </button>
      )}
    </>
  );
};

ButtonShowHide.propTypes = {
  commentsLength: PropTypes.number.isRequired,
  isShowedCommentsOnClick: PropTypes.func.isRequired,
};
