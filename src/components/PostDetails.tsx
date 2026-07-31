import React, { useEffect, useState } from 'react';
import { addComment, getPostComments, removeComment } from '../api/api';
import { Comment, NewComment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [hasLoadingError, setHasLoadingError] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    setComments([]);
    setHasLoadingError(false);
    setIsFormVisible(false);
    setDeleteError('');
    setIsLoading(true);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => {
        setHasLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post.id]);

  const handleAddComment = async (comment: NewComment) => {
    const createdComment = await addComment(comment);

    setComments(currentComments => [...currentComments, createdComment]);

    return createdComment;
  };

  const handleDeleteComment = async (commentId: number) => {
    const deletedComment = comments.find(comment => comment.id === commentId);

    if (!deletedComment) {
      return;
    }

    const deletedIndex = comments.findIndex(
      comment => comment.id === commentId,
    );

    setDeleteError('');

    // Оптимистическое удаление:
    // сначала удаляем на экране
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    try {
      await removeComment(commentId);
    } catch {
      // При ошибке возвращаем комментарий
      // на прежнее место
      setComments(currentComments => {
        const restoredComments = [...currentComments];

        restoredComments.splice(deletedIndex, 0, deletedComment);

        return restoredComments;
      });

      setDeleteError('Unable to delete a comment');
    }
  };

  const hasComments = comments.length > 0;

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

        {!isLoading && hasLoadingError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {deleteError && (
          <div className="notification is-danger">{deleteError}</div>
        )}

        {!isLoading && !hasLoadingError && !hasComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasLoadingError && hasComments && (
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
                    onClick={() => {
                      handleDeleteComment(comment.id);
                    }}
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

        {!isLoading && !hasLoadingError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              setIsFormVisible(true);
            }}
          >
            Write a comment
          </button>
        )}
      </div>

      {!isLoading && !hasLoadingError && isFormVisible && (
        <NewCommentForm postId={post.id} onAdd={handleAddComment} />
      )}
    </div>
  );
};
