import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { deleteComment, getComments, postComment } from '../api/comments';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addNewComment = useCallback(async (comment: CommentData) => {
    const newComment = { ...comment, id };

    try {
      const addedComment = await postComment(newComment);

      setComments(currentComment => [...currentComment, addedComment]);
    } catch {
      setError(true);
    }
  }, []);

  const deleteSelectedComment = useCallback(async (commentId: number) => {
    const tempComments = [...comments];

    setComments(currentComments => (
      currentComments.filter(comment => comment.id !== commentId)
    ));

    try {
      setDeleteError(false);
      await deleteComment(commentId);
    } catch {
      setComments(tempComments);
      setDeleteError(true);
    }
  }, []);

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        setComments([]);
        setIsFormVisible(false);
        setLoadError(false);
        setIsLoading(true);
        const commentsFromServer = await getComments(post.id);

        setComments(commentsFromServer);
      } catch {
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostComments();
  }, [post.id]);

  useEffect(() => {
    const deleteErrorTimer = setTimeout(() => {
      setDeleteError(false);
    }, 3000);

    return () => clearTimeout(deleteErrorTimer);
  }, [deleteError]);

  useEffect(() => {
    const addErrorTimer = setTimeout(() => {
      setError(false);
    }, 3000);

    return () => clearTimeout(addErrorTimer);
  }, [error]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">
          {body}
        </p>
      </div>

      <div className="block">

        {isLoading && (
          <Loader />
        )}

        {loadError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!comments.length ? (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        ) : (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
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
                    onClick={() => deleteSelectedComment(comment.id)}
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
        {error && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Can&apos;t add new comment
          </div>
        )}

        {deleteError && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Can&apos;t delete comment
          </div>
        )}

        {!isFormVisible ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        ) : (
          <NewCommentForm onAddComment={addNewComment} />
        )}
      </div>
    </div>
  );
};
