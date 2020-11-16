import React, { useEffect, useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';
import { PostComment } from '../PostComment';

export const PostDetails = memo(({ selectedPostId }) => {
  const [postDetails, setDetails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [hideStatus, setHideStatus] = useState(true);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedPostId]);

  const loadData = async() => {
    const [details, comments] = await Promise.all(
      [getPostDetails(selectedPostId), getPostComments(selectedPostId)],
    );

    setValidation(false);
    setDetails(details);
    setPostComments(comments);
  };

  const handleHide = useCallback(() => {
    setHideStatus(!hideStatus);
  }, [hideStatus]);

  const handleDelete = useCallback(async(commentId) => {
    await deleteComment(commentId);

    loadData();
  }, []);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleHide}
        >
          {
            hideStatus
              ? `Hide ${postComments.length} comments`
              : `Show ${postComments.length} comments`
          }

        </button>

        {hideStatus && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <PostComment
                key={comment.id}
                comment={comment}
                handleDelete={handleDelete}
              />
            ))}

          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            loadData={loadData}
            validation={validation}
            setValidation={setValidation}
          />
        </div>
      </section>
    </div>
  );
});

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
}.isRequired;
