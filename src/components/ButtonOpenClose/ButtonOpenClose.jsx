import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ButtonOpenClose = ({ changePostId, postId }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickClose = () => {
    changePostId(0);
    setIsClicked(false);
  };

  const handleClickOpen = () => {
    changePostId(postId);
    setIsClicked(true);
  };

  return (
    <>
      {isClicked ? (
        <button
          type="button"
          className="PostsList_button button"
          onClick={handleClickClose}
        >
          Close
        </button>
      ) : (
        <button
          type="button"
          className="PostsList_button button"
          onClick={handleClickOpen}
        >
          Open
        </button>
      )}
    </>
  );
};

ButtonOpenClose.propTypes = {
  changePostId: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
