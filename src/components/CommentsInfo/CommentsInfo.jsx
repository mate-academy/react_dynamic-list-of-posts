import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CommentShape } from '../shapes/CommentShape';

export const CommentsInfo = (props) => {
  const { comments, isShownComments, setIsShownComments } = props;

  return (
    <div className="PostDetails__coments-info">
      <p>{`${comments.length} Comments`}</p>
      <button
        type="button"
        className="PostDetails__button button"
        onClick={() => setIsShownComments(!isShownComments)}
      >
        <i
          className={classNames('fa-comment-dots',
            'PostDetails__comments-icon',
            {
              fas: isShownComments,
              far: !isShownComments,
            })}
        />
        {
          isShownComments ? 'Hide' : 'Show'
        }
      </button>
    </div>
  );
};

CommentsInfo.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(CommentShape)).isRequired,
  isShownComments: PropTypes.bool.isRequired,
  setIsShownComments: PropTypes.func.isRequired,
};
