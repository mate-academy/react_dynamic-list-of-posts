import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | undefined;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setIsFormVisible(false);
      setIsLoading(true);
      setIsError(false);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  const addNewComment = useCallback((newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  }, []);

  const deleteCommentHandler = useCallback((commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));

    deleteComment(commentId).catch(() => {
      // Опционально: можно добавить обработку ошибок для восстановления удалённого комментария
    });
  }, []);

  const renderedComments = useMemo(
    () =>
      comments.map(comment => (
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
              onClick={() => deleteCommentHandler(comment.id)}
            />
          </div>
          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>
        </article>
      )),
    [comments, deleteCommentHandler],
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>
        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !isError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {renderedComments}

        {!isFormVisible && !isLoading && !isError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormVisible && selectedPost && (
        <NewCommentForm
          selectedPostId={selectedPost.id}
          addNewComment={addNewComment}
        />
      )}
    </div>
  );
};
