import React from 'react';
import PropTypes from 'prop-types';
import { CommentsInfo } from '../CommentsInfo';
import { Comments } from '../Comments';
import { CommentShape } from '../shapes/CommentShape';

export const CommentsBlock = (props) => {
  const { comments, isShownComments, setIsShownComments, handleDelete } = props;

  return (
    <section className="PostDetails__comments">
      {
        !!comments.length && (
          <CommentsInfo
            comments={comments}
            isShownComments={isShownComments}
            setIsShownComments={setIsShownComments}
          />
        )
      }

      {
        isShownComments && (
          <Comments
            comments={comments}
            handleDelete={handleDelete}
          />
        )
      }
    </section>
  );
};

CommentsBlock.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(CommentShape)).isRequired,
  isShownComments: PropTypes.bool.isRequired,
  setIsShownComments: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
