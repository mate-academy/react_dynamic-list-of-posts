import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Posts = ({ title, userId, id, setPost }) => {
  const [button, setButton] = useState(false);

  const toggleInfo = () => {
    setPost(id);
    setButton(true);

    if (button) {
      setButton(false);
      setPost(null);
    }
  };

  return (
    <li className="PostsList__item">
      <div>
        <b>
          {`[User #${userId}]: `}
        </b>
        {title}
      </div>

      <button
        type="button"
        className="PostsList__button button"
        onClick={toggleInfo}
      >
        {!button
          ? 'Open'
          : 'Close'
        }
      </button>
    </li>
  );
};

Posts.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  setPost: PropTypes.func.isRequired,
};
