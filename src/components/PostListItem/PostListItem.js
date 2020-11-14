import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const PostsListItem = (props) => {
  const {
    post: { title, userId, id },
    setSelectedPostId,
    selectedPostId,
  } = props;
  const [isClicked, setIsClicked] = useState(false);

  const onClick = () => {
    if (isClicked) {
      setIsClicked(false);
      setSelectedPostId(0);
    } else {
      setIsClicked(true);
      setSelectedPostId(id);
    }
  };

  return (
    <>
      <div>
        <b>{`[User #${userId}]: `}</b>
        {title}
      </div>

      <button
        type="button"
        className={cn('PostsList__button button', {
          active: id === selectedPostId,
        })}
        onClick={onClick}
      >
        {isClicked ? 'Close' : 'Open'}
      </button>
    </>
  );
};

PostsListItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    userId: PropTypes.number,
    id: PropTypes.number,
  }),
  setSelectedPostId: PropTypes.func.isRequired,
  selectedPostId: PropTypes.number,
};

PostsListItem.defaultProps = {
  post: [],
  selectedPostId: 0,
};
