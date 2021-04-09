import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';
import { Loader } from '../Loader';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState('');
  const [postComments, setPostComments] = useState('');
  const [visibilityComments, setVisibilityComments] = useState('false');

  useEffect(() => {
    getPostDetails(selectedPostId).then(result => setPostDetails(result));
    getPostComments(selectedPostId).then(result => setPostComments(result));
  }, [selectedPostId]);

  const handleChangeVisibilityComments = () => {
    setVisibilityComments(!visibilityComments);
  };

  const handlerDeleteComment = (commentId) => {
    deletePostComment(commentId);

    setPostComments(prevComments => prevComments.filter(
      comment => comment.id !== commentId,
    ));
  };

  const addComment = (comment) => {
    setPostComments(prevComments => [...prevComments, comment]);
  };

  return (
    <>
      {postDetails && postComments ? (
        <div className="PostDetails">
          <h2>Post details:</h2>
          <section className="PostDetails__post">
            <p>{postDetails && postDetails.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={handleChangeVisibilityComments}
            >
              {`${visibilityComments ? 'Hide' : 'Show'}
          ${postComments && postComments.length} comments`}
            </button>

            {visibilityComments && (
              <ul className="PostDetails__list">
                {postComments && postComments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handlerDeleteComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={selectedPostId}
                addComment={addComment}
              />
            </div>
          </section>
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
