import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment, getComments } from '../../api/comments';

export const PostComments = ({ comments, setComments, postId }) => {
  const handleClick = async(comment) => {
    await deleteComment(comment.id);
    const postComments = await getComments(postId);

    setComments(postComments);
  };

  return (
    <>
      {comments.map(comment => (
        <li
          key={comment.id}
          className="PostDetails__list-item"
        >
          <button
            type="button"
            className="PostDetails__remove-button button"
            onClick={() => {
              handleClick(comment);
            }}
          >
            X
          </button>
          <p>{comment.body}</p>
        </li>
      ))}
    </>
  );
};

PostComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  postId: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};

PostComments.defaultProps = {
  comments: [],
};
