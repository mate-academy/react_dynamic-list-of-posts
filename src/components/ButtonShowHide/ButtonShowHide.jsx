import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ButtonShowHide = ({ commentsLength, isShowedCommentsOnClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickHide = () => {
    setIsClicked(false);
    isShowedCommentsOnClick(false);
  };

  const handleClickShow = () => {
    setIsClicked(true);
    isShowedCommentsOnClick(true);
  };

  return (
    <>
      {isClicked ? (
        <button
          type="button"
          className="button"
          onClick={handleClickHide}
        >
          {`Show ${commentsLength} comments`}
        </button>
      ) : (
        <button
          type="button"
          className="button"
          onClick={handleClickShow}
        >
          {`Hide ${commentsLength} comments`}
        </button>
      )}
    </>
  );
};

ButtonShowHide.propTypes = {
  commentsLength: PropTypes.number.isRequired,
  isShowedCommentsOnClick: PropTypes.func.isRequired,
};
