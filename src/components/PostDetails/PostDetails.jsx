import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { post, remove } from '../../api/api';
import { getComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';

import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState(0);
  const [isVisibleComments, setVisibleComments] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (selectedPostId) {
      getPostDetails(selectedPostId).then(setPostDetails);
      getComments(selectedPostId).then(setComments);
    } else {
      setPostDetails(0);
    }
  }, [selectedPostId]);

  const addComment = (name, email, body) => post('/comments', {
    name, email, body, postId: selectedPostId,
  }).then((newComment) => {
    setComments(listOfComments => [newComment, ...listOfComments]);
  });

  const removeComment = async(commentId) => {
    await remove(`/comments/${commentId}`);
    getComments(selectedPostId).then(setComments);
  };

  return (
    <>
      {!selectedPostId
        ? ('Have no details')
        : (
          <div className="PostDetails">
            <h2>Post details:</h2>
            <section className="PostDetails__post">
              <p>{postDetails.body}</p>
            </section>
            <section className="PostDetails__comments">
              {comments.length > 0
                ? (
                  <button
                    type="button"
                    className="button"
                    onClick={() => setVisibleComments(!isVisibleComments)}
                  >
                    {isVisibleComments && comments.length > 0
                      ? `Hide ${comments.length} comments`
                      : 'Open comments'}
                  </button>
                ) : (
                  'No comments'
                )}

              {isVisibleComments && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li key={comment.id} className="PostDetails__list-item">
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => removeComment(comment.id)}
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
                <NewCommentForm onAddComment={addComment} />
              </div>
            </section>
          </div>
        )
      }
    </>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
