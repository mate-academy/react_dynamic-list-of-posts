import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPostDetails } from '../../api/posts';
import {
  getPostComments,
  deleteComment,
  addComment,
} from '../../api/coments';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentsHiding, setCommentsHiding] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(result => setSelectedPost(result));

    setComments(null);

    getPostComments(selectedPostId)
      .then(result => setComments(result));
  }, [selectedPostId]);

  const removeComment = (id) => {
    deleteComment(id)
      .then(() => {
        setComments(currentList => (
          currentList.filter(comment => comment.id !== id)
        ));
      });
  };

  const addNewComment = (name, email, body) => {
    const commentBody = {
      name,
      email,
      body,
      postId: selectedPostId,
    };

    addComment(commentBody)
      .then((result) => {
        setComments(currentList => [...currentList, result]);
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
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setCommentsHiding(currentStatus => !currentStatus);
                  }}
                >
                  {commentsHiding
                    ? `Show ${comments.length} comments`
                    : `Hide ${comments.length} comments`
                  }
                </button>

                {!commentsHiding && (
                  <ul className="PostDetails__list">
                    {comments.map(comment => (
                      <li className="PostDetails__list-item" key={comment.id}>
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => {
                            removeComment(comment.id);
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
