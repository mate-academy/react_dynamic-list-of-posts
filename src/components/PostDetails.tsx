import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/postComments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setDeleteError(false);

    getPostComments(post.id)
      .then(loadedComments => {
        if (!isCancelled) {
          setComments(loadedComments);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [post.id]);

  const addComment = async (data: CommentData) => {
    const newComment = await createComment({ ...data, postId: post.id });

    setComments(current => [...current, newComment]);
  };

  const handleDelete = async (comment: Comment) => {
    setDeleteError(false);
    setComments(current => current.filter(({ id }) => id !== comment.id));

    try {
      await deleteComment(comment.id);
    } catch {
      setComments(current => [...current, comment].sort((a, b) => a.id - b.id));
      setDeleteError(true);
    }
  };

  const isLoaded = !isLoading && !hasError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && comments.length > 0 && (
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
                    onClick={() => handleDelete(comment)}
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

        {isLoaded && deleteError && (
          <div
            className="notification is-danger is-light"
            data-cy="DeleteCommentError"
          >
            Unable to delete a comment
          </div>
        )}

        {isLoaded && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isLoaded && isFormVisible && <NewCommentForm onSubmit={addComment} />}
    </div>
  );
};
