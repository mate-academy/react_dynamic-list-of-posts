import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { addComment, deleteComment, getComments } from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

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

  const handleCommentDelete = (commentId: number) => {
    try {
      deleteComment(commentId);

      setComments(prevComments => (
        prevComments.filter(comment => comment.id !== commentId)
      ));
    } catch (e) {
      throw new Error(`Error deleting comment: ${e}`);
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
      <div className="block">
        <h2 data-cy="PostTitle">
          {post.title}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {arePostsLoading ? (
          <Loader />
        ) : (
          <>
            {isLoadingError ? (
              <div
                className="notification is-danger"
                data-cy="CommentsError"
              >
                Something went wrong
              </div>
            ) : (
              <>
                {comments.length === 0 ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => (
                      <article
                        className="message is-small"
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
                {!isWritingComment && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsWritingComment(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </>
        )}

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
