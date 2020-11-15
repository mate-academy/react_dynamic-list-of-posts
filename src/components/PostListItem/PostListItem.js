/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { AppContext } from '../../AppContext';

export const PostsListItem = (props) => {
  const {
    post: { title, userId, id },
  } = props;
  const [isClicked, setIsClicked] = useState(false);
  const { selectedPostId, setSelectedPostId, setDetailsLoader } = useContext(
    AppContext
  );

  const onClick = () => {
    if (isClicked) {
      setIsClicked(false);
      setSelectedPostId(0);
    } else {
      setDetailsLoader(true);
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
};

PostsListItem.defaultProps = {
  post: [],
};
