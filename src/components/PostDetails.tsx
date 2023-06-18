import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getComments } from '../api';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = React.memo(({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadComments = useCallback((postId: number) => {
    setIsLoaded(false);

    getComments(postId)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    setComments([]);
    setIsVisible(false);
    setIsLoaded(false);
    loadComments(post.id);
  }, [post]);

  const addComment = useCallback(async ({ name, email, body }: CommentData) => {
    try {
      const newComment: Omit<Comment, 'id'> = {
        postId: post.id,
        name,
        email,
        body,
      };

      const createdComment = await createComment(newComment);

      setComments((currentComments) => [...currentComments, createdComment]);
    } catch {
      setIsError(true);
    }
  }, []);

  const removeComment = useCallback(async (commentId: number) => {
    try {
      setComments((currentComments) => (
        currentComments.filter((comment) => comment.id !== commentId)
      ));
      await deleteComment(commentId);
    } catch {
      setIsError(true);
    }
  }, []);

  const isErrorMessageVisible = isLoaded && isError;
  const isNoCommentsMessageVisible = isLoaded && !isError && !comments.length;
  const isCommentsVisible = isLoaded && !isError && comments.length > 0;
  const isWriteCommentButtonVisible = isLoaded && !isError && !isVisible;
  const isNewCommentFormVisible = isLoaded && !isError && isVisible;

  const handleFormPopupOnClick = () => {
    setIsVisible(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {!isLoaded && (
            <Loader />
          )}

          {isErrorMessageVisible && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isNoCommentsMessageVisible && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentsVisible && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment) => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => removeComment(comment.id)}
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

          {isWriteCommentButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleFormPopupOnClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {isNewCommentFormVisible && (
          <NewCommentForm submitComment={addComment} />
        )}
      </div>
    </div>
  );
});
