import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { deleteComment, getCommentsByPost } from '../utils/api';

type Props = {
  postId: number | null;
  title?: string;
  body?: string;
};

export const PostDetails: React.FC<Props> = ({ postId, title, body }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // #region delete
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [lastFailedId, setLastFailedId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    const prev = comments;

    setComments(prev.filter(c => c.id !== id));
    setDeleteError(null);
    setLastFailedId(null);
    setDeletingIds(s => new Set(s).add(id));

    try {
      await deleteComment(id);
      setDeletingIds(s => {
        const next = new Set(s);

        next.delete(id);

        return next;
      });
    } catch {
      setComments(prev);
      setDeletingIds(s => {
        const next = new Set(s);

        next.delete(id);

        return next;
      });
      setDeleteError('Failed to delete comment. Try again.');
      setLastFailedId(id);
    }
  };

  const retryDelete = () => {
    if (lastFailedId != null) {
      handleDelete(lastFailedId);
    }
  };
  // #endregion

  // load comments
  useEffect(() => {
    setIsFormOpen(false);
    if (!postId) {
      setComments([]);

      return;
    }

    const load = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await getCommentsByPost(postId);

        setComments(data);
      } catch {
        setError('Something went wrong');
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [postId]);

  if (!postId) {
    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 className="title is-3" data-cy="PostTitle">
          {postId}: {title}
        </h2>

        <p className="mb-4" data-cy="PostBody">
          {body}
        </p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !error && comments.length === 0 && (
          <p className="subtitle" data-cy="NoComments">
            No comments yet
          </p>
        )}

        {!isLoading && !error && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {deleteError && (
              <div className="notification is-danger is-light mb-3">
                {deleteError}{' '}
                {lastFailedId != null && (
                  <button
                    type="button"
                    className="button is-small is-danger is-light"
                    onClick={retryDelete}
                  >
                    Retry
                  </button>
                )}
              </div>
            )}

            {comments.map(c => (
              <article
                key={c.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${c.email}`} data-cy="CommentAuthor">
                    {c.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingIds.has(c.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {c.body}
                </div>
              </article>
            ))}

            {!isFormOpen && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormOpen(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {isFormOpen && (
        <NewCommentForm
          postId={postId}
          onSubmitted={(newComment: Comment) => {
            setComments(prev => [...prev, newComment]);
          }}
        />
      )}
    </div>
  );
};
