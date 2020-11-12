import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ButtonOpenClose = ({
  changePostId,
  postId,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {isClicked ? (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => {
            changePostId(0);
            setIsClicked(false);
          }}
        >
          Close
        </button>
      ) : (
        <button
          type="button"
          className="PostsList__button button"
          onClick={() => {
            changePostId(postId);
            setIsClicked(true);
          }}
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
