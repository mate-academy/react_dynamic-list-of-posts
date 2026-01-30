import { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/api';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  postId: number;
};

export const PostComments: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [loadError, setLoadError] = useState(false);
  const [deletionError, setDeletionError] = useState(false);

  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
    setDeletionError(false);
    setIsWriting(false);

    getPostComments(postId)
      .then(setComments)
      .catch(() => setLoadError(true))
      .finally(() => setIsLoading(false));
  }, [postId]);

  const handleDelete = (commentId: number) => {
    setDeletionError(false);

    setComments(prevComms => prevComms.filter(comm => comm.id !== commentId));

    deleteComment(commentId).catch(() => {
      setDeletionError(true);

      getPostComments(postId)
        .then(setComments)
        .catch(() => setLoadError(true));
    });
  };

  const handleAdd = (newComment: Omit<Comment, 'id'>): Promise<void> => {
    setDeletionError(false);

    return createComment(newComment)
      .then(res => setComments(prev => [...prev, res]))
      .catch(error => {
        throw error;
      });
  };

  return (
    <div className="block">
      {isLoading && <Loader />}

      {!isLoading && loadError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}

      {!isLoading && !loadError && (
        <>
          {comments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>
          )}

          {deletionError && (
            <div className="notification is-danger">
              Unable to delete comment
              <button
                className="delete"
                onClick={() => setDeletionError(false)}
                aria-label="close notification"
              />
            </div>
          )}

          {comments.map(comm => (
            <article
              key={comm.id}
              className="message is-small"
              data-cy="Comment"
            >
              <div className="message-header">
                <a href={`mailto:${comm.email}`} data-cy="CommentAuthor">
                  {comm.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleDelete(comm.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comm.body}
              </div>
            </article>
          ))}

          {isWriting ? (
            <NewCommentForm key={postId} postId={postId} onAdd={handleAdd} />
          ) : (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriting(true)}
            >
              Write a comment
            </button>
          )}
        </>
      )}
    </div>
  );
};
