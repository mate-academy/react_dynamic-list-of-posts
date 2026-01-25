import React, { useEffect, useState, useRef } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const nextTempId = useRef(-1);

  useEffect(() => {
    setIsCommentsLoading(true);
    setIsCommentsError(false);
    setIsFormVisible(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setIsCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
  }, [post.id]);

  const handleCommentDelete = (commentId: number) => {
    const commentToDelete = comments.find(c => c.id === commentId);

    setDeletingIds(prev => [...prev, commentId]);
    setComments(prev => prev.filter(comment => comment.id !== commentId));

    client
      .delete(`/comments/${commentId}`)
      .catch(() => {
        setIsCommentsError(true);
        if (commentToDelete) {
          setComments(prev => [...prev, commentToDelete]);
        }
      })
      .finally(() => {
        setDeletingIds(prev => prev.filter(id => id !== commentId));
      });
  };

  const handleCommentAdd = async (data: CommentData) => {
    setIsCommentsError(false);
    setIsAdding(true);

    const tempCommentId = nextTempId.current;

    nextTempId.current -= 1;

    const tempComment: Comment = {
      id: tempCommentId,
      postId: post.id,
      ...data,
    };

    setComments(prev => [...prev, tempComment]);

    try {
      const created = await client.post<Comment>('/comments', {
        ...data,
        postId: post.id,
      });

      setComments(prev =>
        prev.map(comment => (comment.id === tempCommentId ? created : comment)),
      );
    } catch {
      setIsCommentsError(true);
      setComments(prev => prev.filter(comment => comment.id !== tempCommentId));
    } finally {
      setIsAdding(false);
    }
  };

  const hasNoComments =
    !isCommentsLoading && !isCommentsError && comments.length === 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {isCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {hasNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isCommentsLoading && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => {
              const isDeleting = deletingIds.includes(comment.id);

              return (
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
                      onClick={() => handleCommentDelete(comment.id)}
                      disabled={isDeleting}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              );
            })}
          </>
        )}

        {!isCommentsLoading && !isCommentsError && !isFormVisible && (
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

      {isFormVisible && (
        <NewCommentForm onSubmit={handleCommentAdd} isSubmitting={isAdding} />
      )}
    </div>
  );
};
