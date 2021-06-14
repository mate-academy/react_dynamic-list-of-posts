import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import {
  getCommentsPost,
  addComment,
  getCommentDelete,
} from '../../api/comments';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [hideComments, setHideComments] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(post => setSelectedPost(post));

    setComments(null);

    getCommentsPost(selectedPostId)
      .then(comment => setComments(comment
        .filter(item => item.title !== null)));
  }, [selectedPostId]);

  const romoveComment = (commentId) => {
    getCommentDelete(commentId)
      .then(() => {
        setComments(carrentList => (
          carrentList.filter(comment => comment.id !== commentId)
        ));
      });
  };

  const addNewComment = (name, email, body) => {
    const createComment = {
      name,
      email,
      body,
      postId: selectedPostId,
    };

    addComment(createComment)
      .then((result) => {
        setComments(currentComment => [...currentComment, result]);
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {selectedPost ? (
        <>
          <section className="PostDetails__post">
            <p>{selectedPost.title}</p>
          </section>
          {comments ? (
            <>
              <section className="PostDetails__comments">
                {comments.length === 0
                  ? 'No comments yet'
                  : (
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setHideComments(carrentStatus => !carrentStatus);
                      }}
                    >
                      {hideComments
                        ? `Show ${comments.length} comments`
                        : `Hide ${comments.length} comments`
                      }
                    </button>
                  )}

                {!hideComments && (
                <ul className="PostDetails__list">
                  {comments.map(comment => (
                    <li key={comment.id} className="PostDetails__list-item">
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => {
                          romoveComment(comment.id);
                        }}
                      >
                        X
                      </button>
                      <p>{comment.name}</p>
                    </li>
                  ))}
                </ul>
                )}

              </section>

              <section>
                <div className="PostDetails__form-wrapper">
                  <NewCommentForm onAdd={addNewComment} />
                </div>
              </section>
            </>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
