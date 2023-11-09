import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { addComment, deleteComment, getComments } from '../api/comments';

type Props = {
  post: Post;
};

type DelComment = number | null;

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [deletingCommentId, setDeletingCommentID] = useState<DelComment>(null);

  const noCommentCondtion = (
    !arePostsLoading
    && !isLoadingError
    && comments.length === 0
  );

  const showCommentsCondition = (
    !arePostsLoading
    && !isLoadingError
    && comments.length > 0
  );

  const loadComments = useCallback(async () => {
    setArePostsLoading(true);

    try {
      setIsLoadingError(false);
      const loadedComments = await getComments(post.id);

      setComments(loadedComments);
    } catch {
      setIsLoadingError(true);
    } finally {
      setArePostsLoading(false);
    }
  }, [post.id]);

  const handleCommentDelete = async (commentId: number) => {
    setDeletingCommentID(commentId);

    try {
      await deleteComment(commentId);

      setComments(prevComments => (
        prevComments.filter(comment => comment.id !== commentId)
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
        postId: post.id,
      });

      setComments(prevComments => [...prevComments, newPost]);
    } catch {
      setIsLoadingError(true);
    } finally {
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    setIsWritingComment(false);
  }, [loadComments, post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post.title}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {arePostsLoading && <Loader />}

          {!arePostsLoading && isLoadingError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
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

              {comments.map(comment => (
                <article
                  className={cn(
                    'message',
                    'is-small',
                    {
                      'is-loading-custom': (
                        deletingCommentId === comment.id
                      ),
                    },
                  )}
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${comment.email}`}
                      data-cy="CommentAuthor"
                    >
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => {
                        handleCommentDelete(comment.id);
                      }}
                    >
                      delete button
                    </button>
                  </div>

                  <div
                    className="message-body"
                    data-cy="CommentBody"
                  >
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}
        </div>

        {(isWritingComment && !isLoadingError) && (
          <NewCommentForm
            handleCreateComment={handleCreateComment}
            isCommentLoading={isCommentLoading}
          />
        )}
      </div>
    </div>
  );
};
