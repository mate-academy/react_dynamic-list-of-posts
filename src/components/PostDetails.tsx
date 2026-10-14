import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../api/comment';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasDeleteError, setHasDeleteError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setHasError(false);
    setHasDeleteError(false);
    setIsFormOpen(false);
    setComments([]);

    getPostComments(post.id)
      .then(loadedComments => {
        if (active) {
          setComments(loadedComments);
        }
      })
      .catch(() => {
        if (active) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    const deletedComment = comments.find(comment => comment.id === commentId);
    const deletedIndex = comments.findIndex(
      comment => comment.id === commentId,
    );

    setHasDeleteError(false);
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId).catch(() => {
      setHasDeleteError(true);

      if (!deletedComment) {
        return;
      }

      setComments(currentComments => {
        if (currentComments.some(comment => comment.id === commentId)) {
          return currentComments;
        }

        const nextComments = [...currentComments];

        nextComments.splice(Math.max(deletedIndex, 0), 0, deletedComment);

        return nextComments;
      });
    });
  };

  const showComments = !isLoading && !hasError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {showComments && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showComments && comments.length > 0 && (
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

        {showComments && !isFormOpen && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}

        {hasDeleteError && (
          <div className="notification is-danger">
            Unable to delete a comment
          </div>
        )}
      </div>

      {isFormOpen && (
        <NewCommentForm
          postId={post.id}
          onAdd={comment => {
            setComments(currentComments => [...currentComments, comment]);
          }}
        />
      )}
    </div>
  );
};
