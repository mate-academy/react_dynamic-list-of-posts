import React, { useState, useEffect } from 'react';
import { Post } from '../types/Post';
import { getComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormShown, setIsFormShown] = useState(false);

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const loadComments = async (postId: number) => {
    setIsLoading(true);
    setIsFormShown(false);
    setComments([]);
    try {
      const commentsResponse = await getComments(postId);

      if ('statusCode' in commentsResponse) {
        setErrorMessage('There was an error. Please try again later.');
        clearError();
      } else {
        setComments(commentsResponse);
      }
    } catch {
      setErrorMessage('Unable to load comments of the selected post.');
      clearError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (post) {
      loadComments(post.id);
    }
  }, [post]);

  const removeComment = async (commentId: number) => {
    const visibleComments = comments.filter(
      comment => comment.id !== commentId,
    );

    setComments(visibleComments);

    try {
      await deleteComment(commentId);
    } catch {
      setErrorMessage('Unable to delete a comment');
      clearError();
    }
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
          {isLoading && (
            <Loader />
          )}

          {errorMessage && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && (
            !comments.length
              ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <p className="title is-4">Comments:</p>
              )
          )}

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

          {!isLoading && !errorMessage && !isFormShown && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormShown(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShown && (
          <NewCommentForm
            post={post}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
