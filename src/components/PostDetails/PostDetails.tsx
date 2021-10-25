import React, { useState, useEffect } from 'react';

import './PostDetails.scss';

import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, addCommentToServer } from '../../api/comments';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [details, setDetails] = useState({} as PostTypes);
  const [comments, setComments] = useState([] as CommentTypes[]);
  const [showComments, setShownComments] = useState(true);
  const [loading, setLoadingStatus] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(res => {
        setDetails(res);
        setLoadingStatus(false);
      });
  }, [selectedPostId]);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(res => setComments([...res]));
  }, [selectedPostId]);

  const getShowComments = () => {
    if (showComments) {
      setShownComments(false);
    } else {
      setShownComments(true);
    }
  };

  const handleRemove = (id: number) => {
    deleteComment(id)
      .then(() => getPostComments(selectedPostId))
      .then(updateComments => setComments(updateComments));
  };

  const addComment = (newComment: CommentTypes) => {
    addCommentToServer(newComment)
      .then(() => getPostComments(selectedPostId))
      .then(updatedComments => setComments(updatedComments));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {loading && (
        <Loader />
      )}

      <section className="PostDetails__post">
        <p>
          {details.body}
        </p>
      </section>

      {comments.length > 0 && (
        <>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => getShowComments()}
            >
              {showComments ? (
                `Hide ${comments.length} comments`
              ) : (
                'Show comments'
              )}
            </button>

            <ul className="PostDetails__list">
              {showComments && comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => handleRemove(comment.id)}
                  >
                    &times;
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            addNewComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};
