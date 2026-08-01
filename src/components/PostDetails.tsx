/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { ErrorMessage } from '../types/error';
import { Comment, CommentData } from '../types/Comment';

interface Props {
  selectedPost: Post | null;
  setErrorMessage: (message: string) => void;
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  setErrorMessage,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deletingCommentIds, setDeletingCommentIds] = useState<number[]>([]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setShowCommentForm(false);
    setLoading(true);
    setError(false);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(response => {
        if (Array.isArray(response)) {
          setComments(response);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedPost]);

  if (!selectedPost) {
    return null;
  }

  const handleCommentSubmit = (newCommentData: CommentData): Promise<void> => {
    if (!selectedPost) {
      return Promise.reject(new Error('No selected post'));
    }

    setIsSubmitting(true);

    return client
      .post<Comment>('/comments', {
      ...newCommentData,
      postId: selectedPost.id,
    })
      .then(createdComment => {
        setComments(prevComments => [...prevComments, createdComment]);
      })
      .catch(err => {
        setErrorMessage(ErrorMessage.POSTS_LOAD_ERROR);

        return Promise.reject(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleCommentDelete = (commentId: number) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    client.delete(`/comments/${commentId}`).catch(() => {
      setErrorMessage(ErrorMessage.POSTS_LOAD_ERROR);
    });
  };

  return (
    <>
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost.title}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {ErrorMessage.POSTS_LOAD_ERROR}
            </div>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  {ErrorMessage.NO_COMMENTS}
                </p>
              ) : (
                comments.map(comment => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleCommentDelete(comment.id)}
                        disabled={deletingCommentIds.includes(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))
              )}

              {!showCommentForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setShowCommentForm(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {!error && showCommentForm && (
          <NewCommentForm
            onSubmit={handleCommentSubmit}
            isSubmitting={isSubmitting}

          />
        )}
      </div>
    </>
  );
};
