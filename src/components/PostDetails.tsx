import React, { useEffect, useState } from 'react';
import { deleteComment, getCommentsOfPost, postComment } from '../api/api';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { Errors } from '../types/Errors';
import { Comment, CommentData } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null,
  error: Errors,
  setError: (error: Errors) => void,
  isLoadingComments: boolean,
  setIsLoadingComments: (isLoad: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost, error, setError, isLoadingComments, setIsLoadingComments,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormSubmiting, setIsFormSubmiting] = useState(false);

  const isVisibleError = (
    error === Errors.COMMENTS
    || error === Errors.COMMENT_ADD
    || error === Errors.COMMENT_DELETE
  );

  const loadComments = async () => {
    if (selectedPost) {
      try {
        const commentsFromServer = await getCommentsOfPost(selectedPost.id);

        setComments(commentsFromServer);
      } catch {
        setError(Errors.COMMENTS);
      } finally {
        setIsLoadingComments(false);
      }
    }
  };

  const sendNewComment = async (data: CommentData) => {
    if (selectedPost) {
      try {
        setIsFormSubmiting(true);
        const newComment = await postComment({
          ...data,
          postId: selectedPost.id,
        });

        setComments([
          ...comments,
          newComment,
        ]);
      } catch {
        setError(Errors.COMMENT_ADD);
      } finally {
        setIsFormSubmiting(false);
      }
    }
  };

  const removeComment = async (commentId?: number) => {
    if (commentId) {
      deleteComment(commentId);

      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  useEffect(() => {
    loadComments();
    setIsFormVisible(false);
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments
            ? <Loader />
            : (
              <>
                {isVisibleError && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    {error}
                  </div>
                )}

                {!comments.length
                && error !== Errors.COMMENTS
                && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {comments.length > 0 && (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => (
                      <article className="message is-small" data-cy="Comment">
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
                            onClick={() => removeComment(comment.id)}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {comment.body}
                        </div>
                      </article>
                    ))}
                  </>
                )}

                {!isFormVisible && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsFormVisible(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
        </div>

        {isFormVisible && (
          <NewCommentForm
            sendNewComment={sendNewComment}
            isFormSubmiting={isFormSubmiting}
          />
        )}
      </div>
    </div>
  );
};
