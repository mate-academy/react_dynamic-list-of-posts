import React, { useCallback, useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Comment, Details } from '../../types';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';

interface Props {
  postId: number;
}

export const PostDetails: React.FC<Props> = React.memo(({ postId }) => {
  const [details, setDetails] = useState<Details | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(true);

  const getDetails = useCallback((id: number) => {
    getPostDetails(id)
      .then((detailsFromServer: Details) => setDetails(detailsFromServer));
  }, []);

  const getComments = useCallback((id: number) => {
    getPostComments(id)
      .then((commentsFromServer: Comment[]) => setComments(commentsFromServer));
  }, []);

  const createComment = useCallback((newComment) => {
    setComments((prev) => ([
      ...prev,
      {
        ...newComment,
        id: Date.now(),
      },
    ]));
  }, []);

  const deleteComment = useCallback((commentId: number) => {
    removeComment(commentId);
    setComments((prev) => prev.filter(({ id }) => id !== commentId));
  }, []);

  const toggleComments = () => {
    setIsCommentsVisible((isVisible) => !isVisible);
  };

  useEffect(() => {
    setDetails(null);
    setComments([]);

    getDetails(postId);
    getComments(postId);
  }, [postId, getDetails, getComments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {details && (
        <>
          <section className="PostDetails__post">
            <p>{details.body}</p>
          </section>

          <section className="PostDetails__comments">
            {Boolean(comments.length) && (
              <button
                type="button"
                className="button"
                onClick={toggleComments}
              >
                {`${isCommentsVisible ? 'Hide' : 'Show'} ${comments.length} comments`}
              </button>
            )}

            <ul className="PostDetails__list">
              {isCommentsVisible && comments.map(({ id, body }) => (
                <li key={id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteComment(id)}
                  >
                    &times;
                  </button>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
                createComment={createComment}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
});
