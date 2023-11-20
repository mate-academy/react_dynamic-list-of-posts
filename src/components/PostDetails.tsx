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
  const [comments, setComments] = useState<Comment[]>([]);
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [deletingCommentId, setDeletingCommentID] = useState<DelComment>(null);

  const noCommentCondtion
    = !arePostsLoading && !isLoadingError && comments.length === 0;

  const showCommentsCondition
    = !arePostsLoading && !isLoadingError && comments.length > 0;

  const loadComments = useCallback(async () => {
    setArePostsLoading(true);
    try {
      setIsLoadingError(false);
      const loadedComments = await getComments(id);

      setComments(loadedComments);
    } catch {
      setIsLoadingError(true);
    } finally {
      setArePostsLoading(false);
    }
  }, [id]);
  const handleCommentDelete = async (commentId: number) => {
    setDeletingCommentID(commentId);
    try {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter(
        comment => comment.id !== commentId,
      ));
    } catch {
      setIsLoadingError(true);
    } finally {
      setDeletingCommentID(null);
    }
  };

  const handleCreateComment = async (newComment: CommentData) => {
    setIsCommentLoading(true);
    try {
      const newPost = await addComment({
        ...newComment,
        postId: id,
      });

      setComments((prevComments) => [...prevComments, newPost]);
    } catch {
      setIsLoadingError(true);
    } finally {
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    setIsWritingComment(false);
  }, [loadComments, id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{title}</h2>
          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {arePostsLoading && <Loader />}

          {!arePostsLoading && isLoadingError && (
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

              {comments.map(({
                id: commentId,
                email,
                name,
                body: commentBody,
              }) => (
                <article
                  className={cn('message', 'is-small', {
                    'is-loading-custom': deletingCommentId === commentId,
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

        {(!isWritingComment || isLoadingError) && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsWritingComment(true)}
          >
            Write a comment
          </button>
        )}

        {isWritingComment && !isLoadingError && (
          <NewCommentForm
            handleCreateComment={handleCreateComment}
            isCommentLoading={isCommentLoading}
          />
        )}
      </div>
    </div>
  );
};
