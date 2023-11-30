import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentService from '../services/comments';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [removeCommentId, setRemoveCommentId] = useState<number | null>(null);

  const areNotComments
    = !loading && !errorMessage && comments.length === 0;

  const isCommentsShown
    = !loading && !errorMessage && comments.length > 0;

  const getComments = useCallback(async () => {
    setLoading(true);
    try {
      setErrorMessage(false);
      const loadedComments = await commentService.getUserComments(post.id);

      setComments(loadedComments);
    } catch {
      setErrorMessage(true);
    } finally {
      setLoading(false);
    }
  }, [post.id]);

  useEffect(() => {
    getComments();
    setIsWritingComment(false);
  }, [getComments, post.id]);

  const handleAddComment = async (newComment: CommentData) => {
    setIsCommentLoading(true);
    try {
      const newPost = await commentService.addComment({
        ...newComment,
        postId: post.id,
      });

      setComments(currentComments => [...currentComments, newPost]);
    } catch {
      setErrorMessage(true);
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setRemoveCommentId(commentId);
    try {
      await commentService.deleteComment(commentId);
      setComments(currentComments => currentComments
        .filter(comment => commentId !== comment.id));
    } catch {
      setErrorMessage(true);
    } finally {
      setRemoveCommentId(null);
    }
  };

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
          {loading && <Loader />}

          {!loading && errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {areNotComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentsShown && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(({
                id: commentId,
                name,
                email,
                body: commentBody,

              }) => (
                <article
                  className={classNames('message', 'is-small', {
                    'is-loading-custom': removeCommentId === commentId,
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
                        handleDeleteComment(commentId);
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

        {(!isWritingComment || errorMessage) && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              setIsWritingComment(true);
            }}
          >
            Write a comment
          </button>
        )}

        {isWritingComment && !errorMessage && (
          <NewCommentForm
            handleAddComment={handleAddComment}
            isCommentLoading={isCommentLoading}
          />
        )}
      </div>
    </div>
  );
};
