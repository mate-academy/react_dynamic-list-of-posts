import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from './NewCommentForm';
import { Notification } from '../Notification';
import { ErrorType } from '../../Enums/Error';
import { Post } from '../../types/Post';
import { Comment, CommentData } from '../../types/Comment';
// import {
//   addComment,
//   deleteComment,
//   getCommentsByPost,
// } from '../../api/comments';
import { client } from '../../utils/fetchClient';
import {
  optimisticDeleteComment,
  restoreComment,
} from '../../utils/optimisticDeleteComment';

type CommentsState = {
  items: Comment[];
  isLoading: boolean;
  error: string;
};

type ActionsErrorState = {
  add: string;
  delete: string;
};

type Props = { post: Post };

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [commentsState, setCommentsState] = useState<CommentsState>({
    items: [],
    isLoading: false,
    error: '',
  });

  const [errors, setErrors] = useState<ActionsErrorState>({
    add: '',
    delete: '',
  });

  const updateCommentsState = useCallback((updates: Partial<CommentsState>) => {
    setCommentsState(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    setErrors({ add: '', delete: '' });
    setIsCommentFormVisible(false);
    updateCommentsState({ items: [], isLoading: true, error: '' });
    // getCommentsByPost(post.id)
    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(fetchedComments => {
        updateCommentsState({ items: fetchedComments, isLoading: false });
      })
      .catch(() => {
        updateCommentsState({
          items: [],
          isLoading: false,
          error: ErrorType.UNEXPECTED,
        });
      });
  }, [post.id, updateCommentsState]);

  const handleShowCommentForm = () => {
    setIsCommentFormVisible(true);
  };

  const handleAdd = (data: CommentData) => {
    setErrors(prev => ({ ...prev, add: '' }));

    // return addComment({ postId: post.id, ...data })
    return client
      .post<Comment>(`/comments`, { postId: post.id, ...data })
      .then(newComment => {
        setCommentsState(prev => ({
          ...prev,
          items: [...prev.items, newComment],
        }));
      })
      .catch(error => {
        setErrors(prev => ({ ...prev, add: ErrorType.UNEXPECTED }));
        throw error;
      });
  };

  const handleDelete = (commentId: number) => {
    setErrors(prev => ({ ...prev, delete: '' }));

    const result = optimisticDeleteComment(commentsState.items, commentId);

    if (!result) {
      return;
    }

    const { updatedComments, rollback } = result;

    setCommentsState(prev => ({
      ...prev,
      items: updatedComments,
    }));

    // return deleteComment(commentId).catch(error => {
    return client.delete(`/comments/${commentId}`).catch(error => {
      setCommentsState(prev => ({
        ...prev,
        items: restoreComment(prev.items, rollback),
      }));

      setErrors(prev => ({ ...prev, delete: ErrorType.UNEXPECTED }));

      throw error;
    });
  };

  const {
    items: comments,
    isLoading: isCommentsLoading,
    error: commentsLoadError,
  } = commentsState;
  const shouldShowContent = !isCommentsLoading && !commentsLoadError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {commentsLoadError && (
          <Notification
            message={commentsLoadError}
            color={'is-danger'}
            dataCy="CommentsError"
          />
        )}

        {shouldShowContent && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {errors.delete && (
          <Notification message={errors.delete} color="is-danger" />
        )}

        {shouldShowContent && comments.length > 0 && (
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
                    onClick={() => handleDelete(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}
      </div>

      {errors.add && <Notification message={errors.add} color="is-danger" />}

      {shouldShowContent && !isCommentFormVisible && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={handleShowCommentForm}
        >
          Write a comment
        </button>
      )}

      {shouldShowContent && isCommentFormVisible && (
        <NewCommentForm onSubmit={handleAdd} />
      )}
    </div>
  );
};
