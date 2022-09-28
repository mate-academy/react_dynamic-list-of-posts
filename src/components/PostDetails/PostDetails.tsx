import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  getCommentsByPostId,
  deleteComment,
} from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { ErrorNotification } from '../ErrorNotification';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { Error } from '../../types/Error';

type Props = {
  posts: Post[];
  postId: number | null;
  error: Error | null;
  onError: (error: Error | null) => void;
};

export const PostDetails: React.FC<Props> = ({
  posts,
  postId,
  error,
  onError,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentForm, setIsCommentForm] = useState(false);

  const currentPost = posts.filter(post => post.id === postId)[0];

  const handleAddComment = useCallback((newComment) => {
    setComments(allComments => [...allComments, newComment]);
  }, []);

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(
        allComments => allComments.filter(
          comment => comment.id !== commentId,
        ),
      );
      onError(null);

      if (!commentId) {
        return;
      }

      await deleteComment(commentId);
    } catch {
      onError(Error.DELETE_COMMENT);
    }
  };

  const getCommentList = async (id: number | null) => {
    try {
      setIsLoading(true);
      onError(null);
      setIsCommentForm(false);

      if (!id) {
        return;
      }

      const commentList = await getCommentsByPostId(id);

      setComments(commentList);
    } catch {
      onError(Error.GET_COMMENTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      getCommentList(postId);
    }
  }, [postId]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {posts.length && (
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${currentPost.id}: ${currentPost.title}`}
            </h2>

            <p data-cy="PostBody">
              {currentPost.body}
            </p>
          </div>
        )}

        <div className="block">
          {isLoading
            && <Loader />}

          {!isLoading
            && !comments.length
            && !error
            && (
              <p
                className="title is-4"
                data-cy="NoCommentsMessage"
              >
                No comments yet
              </p>
            )}

          {!isLoading
            && error
            && (
              <ErrorNotification
                error={error}
                element="CommentsError"
              />
            )}

          {!isLoading
            && comments.length > 0
            && !error
            && (
              <p className="title is-4">
                Comments:
              </p>
            )}

          {!isLoading
            && !error
            && comments.map(comment => (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

          {!isLoading
            && !isCommentForm
            && !error
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                aria-label="WriteCommentButton"
                onClick={() => setIsCommentForm(true)}
              >
                Write a comment
              </button>
            )}
        </div>

        {isCommentForm
          && (
            <NewCommentForm
              postId={postId}
              onAdd={handleAddComment}
              onError={onError}
            />
          )}
      </div>
    </div>
  );
};
