import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import {
  addComment,
  deleteComment,
  getComments,
} from '../services/PostComments';

type Props = {
  title: string;
  body: string;
  id: number;
};

type DelComment = number | null;

export const PostDetails: React.FC<Props> = ({ title, body, id }) => {
  const [state, setState] = useState({
    comments: [] as Comment[],
    arePostsLoading: true,
    isLoadingError: false,
    isWritingComment: false,
    isCommentLoading: false,
    deletingCommentId: null as DelComment,
  });

  const noCommentCondtion = !state.arePostsLoading
  && !state.isLoadingError && state.comments.length === 0;

  const showCommentsCondition = !state.arePostsLoading
  && !state.isLoadingError && state.comments.length > 0;

  const loadComments = useCallback(async () => {
    setState((prev) => ({ ...prev, arePostsLoading: true }));
    try {
      setState((prev) => ({ ...prev, isLoadingError: false }));
      const loadedComments = await getComments(id);

      setState((prev) => ({ ...prev, comments: loadedComments }));
    } catch {
      setState((prev) => ({ ...prev, isLoadingError: true }));
    } finally {
      setState((prev) => ({ ...prev, arePostsLoading: false }));
    }
  }, [id]);

  const handleCommentDelete = async (commentId: number) => {
    setState((prev) => ({ ...prev, deletingCommentId: commentId }));
    try {
      await deleteComment(commentId);
      setState((prev) => ({
        ...prev,
        comments: prev.comments.filter((comment) => comment.id !== commentId),
      }));
    } catch {
      setState((prev) => ({ ...prev, isLoadingError: true }));
    } finally {
      setState((prev) => ({ ...prev, deletingCommentId: null }));
    }
  };

  const handleCreateComment = async (newComment: CommentData) => {
    setState((prev) => ({ ...prev, isCommentLoading: true }));
    try {
      const newPost = await addComment({
        ...newComment,
        postId: id,
      });

      setState((prev) => ({ ...prev, comments: [...prev.comments, newPost] }));
    } catch {
      setState((prev) => ({ ...prev, isLoadingError: true }));
    } finally {
      setState((prev) => ({ ...prev, isCommentLoading: false }));
    }
  };

  useEffect(() => {
    loadComments();
    setState((prev) => ({ ...prev, isWritingComment: false }));
  }, [loadComments, id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{title}</h2>
          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {state.arePostsLoading && <Loader />}

          {!state.arePostsLoading && state.isLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noCommentCondtion && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {showCommentsCondition && (
            <>
              <p className="title is-4">Comments:</p>

              {state.comments
                .map(({
                  id: commentId,
                  email,
                  name,
                  body: commentBody,
                }) => (
                  <article
                    className={cn('message', 'is-small', {
                      'is-loading-custom':
                      state.deletingCommentId === commentId,
                    })}
                    data-cy="Comment"
                    key={commentId}
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => {
                          handleCommentDelete(commentId);
                        }}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {commentBody}
                    </div>
                  </article>
                ))}
            </>
          )}
        </div>

        {(!state.isWritingComment || state.isLoadingError) && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={
              () => setState((prev) => ({ ...prev, isWritingComment: true }))
            }
          >
            Write a comment
          </button>
        )}

        {state.isWritingComment && !state.isLoadingError && (
          <NewCommentForm
            handleCreateComment={handleCreateComment}
            isCommentLoading={state.isCommentLoading}
          />
        )}
      </div>
    </div>
  );
};
