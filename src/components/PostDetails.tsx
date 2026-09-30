import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getCommentsByPostId } from '../api/Comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    setComments([]);
    setCommentsError(false);
    setIsCommentsLoading(true);
    setIsFormVisible(false);
    setDeleteError(false);

    getCommentsByPostId(post.id)
      .then(loadComments => {
        if (isCurrentRequest) {
          setComments(loadComments);
        }
      })
      .catch(() => {
        if (isCurrentRequest) {
          setCommentsError(true);
        }
      })
      .finally(() => {
        if (isCurrentRequest) {
          setIsCommentsLoading(false);
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [post.id]);

  const handleCommentAdded = (comment: Comment) => {
    setComments(current => [...current, comment]);
  };

  const handleCommentDelete = async (commentId: number) => {
    const deletedIndex = comments.findIndex(
      comment => comment.id === commentId,
    );

    const deletedComment = comments[deletedIndex];

    setComments(current => current.filter(comment => comment.id !== commentId));
    setDeleteError(false);

    try {
      await deleteComment(commentId);
    } catch {
      if (deletedComment) {
        setComments(current => {
          const restored = [...current];

          restored.splice(deletedIndex, 0, deletedComment);

          return restored;
        });
      }

      setDeleteError(true);
    }
  };

  const renderBlock = () => {
    if (isCommentsLoading) {
      return <Loader />;
    }

    if (commentsError) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    if (comments.length === 0) {
      return (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      );
    }

    return (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map(comment => (
          <article
            key={comment.id}
            className="message is-small"
            data-cy="Comment"
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
                onClick={() => handleCommentDelete(comment.id)}
              />
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}
      </>
    );
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
            Could not delete comment. Please try again.
          </div>
        )}
        {renderBlock()}

        {!isCommentsLoading && !commentsError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
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
