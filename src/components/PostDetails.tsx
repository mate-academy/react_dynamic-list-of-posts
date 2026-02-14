import React, { useEffect, useState } from 'react';
import {
  deleteCommentFromServer,
  getPostCommentsFromServer,
} from '../api/commentApi';
import { Comment, CommentsState } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [commentsState, setCommentsState] = useState<CommentsState>({
    isLoading: false,
    isCommentsLoadingError: false,
    isCommentDeleteError: false,
    comments: [],
    isFormOpened: false,
  });
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const updateCommentsState = (newState: Partial<CommentsState>) => {
    setCommentsState(prev => ({
      ...prev,
      ...newState,
    }));
  };

  useEffect(() => {
    const fetchComments = async () => {
      updateCommentsState({ isFormOpened: false });

      if (!post) {
        return;
      }

      updateCommentsState({ isLoading: true, isCommentsLoadingError: false });

      try {
        const fetchedComments = await getPostCommentsFromServer(post.id);

        updateCommentsState({ comments: fetchedComments });
      } catch (error) {
        updateCommentsState({ isCommentsLoadingError: true });
        updateCommentsState({ comments: [] });
      } finally {
        updateCommentsState({ isLoading: false });
      }
    };

    fetchComments();
  }, [post]);

  const handleWriteComment = () => {
    updateCommentsState({ isFormOpened: true });
  };

  const handleDeleteComment = async (commentId: number) => {
    const lastRemoved: {
      comment: Comment | null;
      index: number | null;
    } = {
      comment: null,
      index: null,
    };

    setDeleteError(null);
    setCommentsState(previousState => {
      const commentToRemove: Comment | undefined = previousState.comments.find(
        (comment: Comment) => comment.id === commentId,
      );
      const index = previousState.comments.findIndex(
        (comment: Comment) => comment.id === commentId,
      );

      if (!commentToRemove || index < 0) {
        return previousState;
      }

      lastRemoved.comment = commentToRemove;
      lastRemoved.index = index;

      return {
        ...previousState,
        comments: previousState.comments.filter(
          comment => comment.id !== commentId,
        ),
      };
    });

    try {
      await deleteCommentFromServer(commentId);
    } catch (error) {
      setCommentsState(previousState => {
        if (!lastRemoved.comment || lastRemoved.index === null) {
          return previousState;
        }

        const next = [...previousState.comments];

        next.splice(lastRemoved.index, 0, lastRemoved.comment);

        return { ...previousState, comments: next };
      });
      setDeleteError('Failed to delete comment. Please try again.');
    }
  };

  const WriteCommentButton = ({ onClick }: { onClick: () => void }) => (
    <>
      <button
        data-cy="WriteCommentButton"
        type="button"
        className="button is-link"
        onClick={onClick}
      >
        Write a comment
      </button>
    </>
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          {deleteError && (
            <div
              className="notification is-danger is-light"
              style={{ marginBottom: '1rem', padding: '0.5rem' }}
            >
              {deleteError}
            </div>
          )}
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {commentsState.isLoading ? (
            <Loader />
          ) : commentsState.isCommentsLoadingError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : commentsState.comments.length > 0 ? (
            <>
              <p className="title is-4">Comments:</p>

              {commentsState.comments.map((comment: Comment) => {
                return (
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
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                );
              })}
            </>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!(
            commentsState.isFormOpened ||
            commentsState.isLoading ||
            commentsState.isCommentsLoadingError
          ) && <WriteCommentButton onClick={handleWriteComment} />}
        </div>

        {commentsState.isFormOpened && (
          <NewCommentForm
            postId={post.id}
            onAddComment={comment =>
              setCommentsState(prev => ({
                ...prev,
                comments: [...prev.comments, comment],
              }))
            }
          />
        )}
      </div>
    </div>
  );
};
