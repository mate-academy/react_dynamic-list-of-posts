import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteError, setDeleteError] = useState<{
    comment: Comment;
    index: number;
  } | null>(null);

  useEffect(() => {
    setLoadingComments(true);
    setCommentsError(false);
    setShowForm(false);
    setDeleteError(null);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setLoadingComments(false));
  }, [post.id]);

  const performDeleteComment = (comment: Comment, originalIndex: number) => {
    client.delete(`/comments/${comment.id}`).catch(() => {
      setComments(prevComments => {
        if (prevComments.some(prevComment => prevComment.id === comment.id)) {
          return prevComments;
        }

        const restoredComments = [...prevComments];
        const safeIndex = Math.min(originalIndex, restoredComments.length);

        restoredComments.splice(safeIndex, 0, comment);

        return restoredComments;
      });
      setDeleteError({ comment, index: originalIndex });
    });
  };

  const handleDeleteComment = (commentId: number) => {
    const originalIndex = comments.findIndex(
      comment => comment.id === commentId,
    );
    const deletedComment = comments[originalIndex];

    if (!deletedComment) {
      return;
    }

    setDeleteError(null);
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    performDeleteComment(deletedComment, originalIndex);
  };

  const handleRetryDelete = () => {
    if (!deleteError) {
      return;
    }

    const { comment, index } = deleteError;

    setDeleteError(null);
    setComments(prevComments =>
      prevComments.filter(prevComment => prevComment.id !== comment.id),
    );
    performDeleteComment(comment, index);
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {deleteError && (
          <div className="notification is-danger">
            Failed to delete a comment.
            <button
              type="button"
              className="button is-danger is-light ml-3"
              onClick={handleRetryDelete}
            >
              Retry
            </button>
          </div>
        )}

        {loadingComments && <Loader />}

        {!loadingComments && commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loadingComments && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loadingComments && !commentsError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
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
            ))}
          </>
        )}

        {!showForm && !loadingComments && !commentsError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}

        {showForm && (
          <NewCommentForm postId={post.id} onCommentAdded={handleAddComment} />
        )}
      </div>
    </div>
  );
};
