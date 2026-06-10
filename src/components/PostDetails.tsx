import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getPostComments, deleteComment } from '../utils/api';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post;
  onClose: () => void;
}

export const PostDetails: React.FC<Props> = ({ post, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIsFormVisible(false);
    setComments([]);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const handleDelete = (commentId: number) => {
    const backupComments = [...comments];

    // Одразу прибираємо коментар з UI, не чекаючи бекенду
    setComments(currentComments =>
      currentComments.filter(c => c.id !== commentId),
    );

    // Робимо запит на сервер
    deleteComment(commentId).catch(() => {
      // Якщо сервер повернув помилку (наприклад, зник інтернет),
      // повертаємо коментар назад у список
      setComments(backupComments);
      // Тут можна додати виклик глобальної нотифікації, якщо вона є
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        {/* eslint-disable-next-line max-len*/}
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <h2 className="title is-4 mb-0" data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>
          <button
            type="button"
            className="button is-text is-small"
            data-cy="CloseButton"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <p className="mt-4" data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <hr />

      <h3 className="title is-5">Comments</h3>

      {isLoading && <Loader />}

      {hasError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong!
        </div>
      )}

      {!isLoading && !hasError && comments.length === 0 && (
        <p data-cy="NoCommentsMessage">No comments yet</p>
      )}

      {!isLoading && !hasError && comments.length > 0 && (
        <div className="block">
          {comments.map(comment => (
            <article
              className="message is-small"
              key={comment.id}
              data-cy="Comment"
            >
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                  {comment.name}
                </a>
                <button
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  data-cy="DeleteButton"
                  onClick={() => handleDelete(comment.id)}
                ></button>
              </div>
              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
        </div>
      )}

      {!isFormVisible && !isLoading && !hasError && (
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
        <div className="box">
          <NewCommentForm
            postId={post.id}
            onAdd={newComment => setComments(prev => [...prev, newComment])}
          />
        </div>
      )}
    </div>
  );
};
