import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Comments } from '../Comments/Comments';
import { NewCommentForm } from '../NewCommentForm';

export const Details = ({
  selectedPost,
  details,
  comment,
  setComment,
}) => {
  const [isDisable, setIsDiseble] = useState(true);
  const onDisable = () => setIsDiseble(!isDisable);
  const editComment = useCallback(setComment, []);

  return (
    <>
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={onDisable}
        >
          {`Hide ${comment && comment.length} comments`}
        </button>

        <ul
          className="PostDetails__list"
          hidden={isDisable}
        >
          {comment && comment.map(item => (
            <Comments
              key={item.id}
              comment={item}
              selectedPost={selectedPost}
              editComment={editComment}
            />
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPost={selectedPost}
            editComment={editComment}
          />
        </div>
      </section>
    </>
  );
};

Details.propTypes = {
  selectedPost: PropTypes.number.isRequired,
  details: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  setComment: PropTypes.func.isRequired,
  comment: PropTypes.arrayOf([]).isRequired,
};
