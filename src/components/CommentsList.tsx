import { useState, useEffect, useCallback } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';

import { getComments, removeComment, addComment } from '../api/comments';
import { Loader } from './Loader';

type Props = {
  postId: number,
};

export const CommentsList: React.FC<Props> = ({ postId }) => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isOpenNewForm, setIsOpenNewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingError, setIsProcessingError] = useState(false);

  const visibleCommentsList = commentsList.length;

  const handleOpenNewForm = () => {
    setIsOpenNewForm(true);
  };

  const getCommentsToPost = async () => {
    try {
      setIsLoading(true);
      const commentsData = await getComments(postId);

      setCommentsList(commentsData);
    } catch {
      setIsProcessingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCommentsToPost();

    return () => {
      setIsLoading(false);
    };
  }, [postId]);

  const deleteCommentFromServer = async (commentId: number) => {
    try {
      await removeComment(commentId);
      await getCommentsToPost();
    } catch {
      setIsProcessingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = useCallback(async (comment: CommentData) => {
    const newComment = {
      postId,
      ...comment,
    };

    try {
      const commentData = await addComment(newComment);

      setCommentsList(current => [...current, commentData]);
    } catch {
      setIsProcessingError(true);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isProcessingError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="block">
      {!visibleCommentsList
        ? (
          <p
            className="title is-4"
            data-cy="NoCommentsMessage"
          >
            No comments yet
          </p>
        )
        : (
          <>
            <p className="title is-4">Comments:</p>
            {commentsList.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
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
                    onClick={() => {
                      deleteCommentFromServer(comment.id);
                    }}
                  >
                    delete button
                  </button>
                </div>
                <div
                  className="message-body"
                  data-cy="CommentBody"
                >
                  {comment.body}
                </div>
              </article>

            ))}
          </>
        )}

      {isOpenNewForm
        ? <NewCommentForm onAddComment={handleAddComment} />
        : (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleOpenNewForm}
          >
            Write a comment
          </button>
        )}
    </div>

  );
};
