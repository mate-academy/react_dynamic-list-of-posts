import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pendingData, setPendingData] = useState<CommentData | null>(null);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setComments([]);
    setIsFormOpen(false);
    setSubmitError(null);
    setPendingData(null);
    setDeleteError(null);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setError('Failed to load comments'))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const onAdd = async (data: CommentData) => {
    setSubmitLoading(true);
    setSubmitError(null);
    setPendingData(data);

    try {
      const created = await client.post<Comment>('/comments', {
        ...data,
        postId: post.id,
      });

      setComments(curr => [...curr, created]);
      setPendingData(null);
    } catch {
      setSubmitError('Failed to add a comment');
    } finally {
      setSubmitLoading(false);
    }
  };

  const onRetryAdd = () => {
    if (pendingData) {
      onAdd(pendingData);
    }
  };

  const onDelete = async (id: number) => {
    setDeleteError(null);

    const toDelete = comments.find(c => c.id === id);

    if (!toDelete) {
      return;
    }

    setComments(curr => curr.filter(c => c.id !== id));

    try {
      await client.delete(`/comments/${id}`);
    } catch {
      setComments(curr => {
        const restored = [...curr, toDelete];

        return restored.sort((a, b) => a.id - b.id);
      });
      setDeleteError('Failed to delete. Try again?');
    }
  };

  const onRetryDelete = async (id: number) => {
    setDeleteError(null);
    await onDelete(id);
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
        {isLoading && <Loader />}

        {!isLoading && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !error && comments.length > 0 && (
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
                    onClick={() => onDelete(comment.id)}
                    title="Delete"
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>

                {deleteError && (
                  <div className="notification is-warning is-light m-2">
                    {deleteError}{' '}
                    <button
                      type="button"
                      className="button is-small is-warning"
                      onClick={() => onRetryDelete(comment.id)}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </article>
            ))}
          </>
        )}

        {!isFormOpen && !isLoading && !error && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormOpen && (
        <NewCommentForm
          key={post.id}
          onSubmit={onAdd}
          isSubmitting={submitLoading}
          submitError={submitError}
          onRetry={onRetryAdd}
        />
      )}
    </div>
  );
};
