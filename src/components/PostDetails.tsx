import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Errors } from '../types/Errors';
import { getComments, deleteComment } from '../api/comments';

type Props = {
  post: Post;
  newCommentCreating: boolean;
  setNewCommentCreating: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  newCommentCreating,
  setNewCommentCreating,
}) => {
  const { id, title, body } = post;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [currentError, setCurrentError] = useState<Errors | null>(null);

  const handleDeleteComment = (comment: Comment) => {
    setCurrentError(null);
    setComments(comments.filter(c => c.id !== comment.id));

    const restoreDeletedComment = () => {
      setComments(prevComments => [...prevComments, comment]);
      setCurrentError(Errors.CommentDeleting);
    };

    deleteComment(comment.id)
      .then((response: unknown) => {
        if (response && typeof response === 'object' && 'error' in response) {
          restoreDeletedComment();
        }
      })
      .catch(() => {
        restoreDeletedComment();
      });
  };

  useEffect(() => {
    if (!post) {
      return;
    }

    setCurrentError(null);
    setIsCommentsLoading(true);
    setComments([]);

    getComments(id)
      .then(response => {
        if (Array.isArray(response) && response.length > 0) {
          setComments(response);
        }

        if (!Array.isArray(response)) {
          setCurrentError(Errors.CommentsLoading);
        }

        if (Array.isArray(response) && response.length === 0) {
          setCurrentError(Errors.NoComments);
        }
      })
      .catch(() => setCurrentError(Errors.CommentsLoading))
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {currentError === Errors.CommentsLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {currentError === Errors.NoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isCommentsLoading && comments.length > 0 && (
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
                      onClick={() => handleDeleteComment(comment)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
              {currentError === Errors.CommentDeleting && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong while deleting a comment
                </div>
              )}
            </>
          )}

          {!newCommentCreating && !isCommentsLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setNewCommentCreating(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {newCommentCreating && (
          <NewCommentForm postId={id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
