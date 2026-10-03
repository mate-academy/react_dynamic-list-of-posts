import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments, deleteComment } from '../utils/apiComments';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deletingCommentId, setDeletingCommentId] =
    useState<number | null>(null);

  useEffect(() => {
    if (!post) {
      setComments([]);

      return;
    }

    setIsLoadingComments(true);
    setCommentsError(false);
    setComments([]);
    setIsFormVisible(false);

    getComments(post.id)
      .then(setComments)
      .catch(() => {
        setCommentsError(true);
      })
      .finally(() => {
        setIsLoadingComments(false);
      });
  }, [post]);

  const handleDeleteComment = (commentId: number) => {
    setDeleteError(false);
    setDeletingCommentId(commentId);

    deleteComment(commentId)
      .then(() => {
        setComments(currentComments =>
          currentComments.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => {
        setDeleteError(true);
      })
      .finally(() => {
        setDeletingCommentId(null);
      });
  };

  const handleCommentAdded = (comment: Comment) => {
    setComments(currentComments => [...currentComments, comment]);
  };

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoadingComments && <Loader />}

        {deleteError && (
          <div
            className="notification is-danger"
            role="alert"
            data-cy="DeleteError"
          >
            Unable to delete comment. Please try again.
          </div>
        )}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && !commentsError && comments.length > 0 && (
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
                    disabled={deletingCommentId === comment.id}
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoadingComments && !commentsError && !isFormVisible && (
          <button
            type="button"
            className="button is-link"
            data-cy="WriteCommentButton"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isFormVisible && (
          <NewCommentForm
            postId={post.id}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  );
};
