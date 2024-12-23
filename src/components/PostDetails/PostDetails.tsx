import React, { useEffect, useState } from 'react';
import { addComment, deleteComment, getComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const loadComments = async (postId: number) => {
    setIsLoading(true);
    setError(false);
    setMessage(false);
    setIsWriting(false);
    setComments([]);

    try {
      const loadedComments = await getComments(postId);

      if (loadedComments.length === 0) {
        setMessage(true);
      }

      setComments(loadedComments);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments(post.id);
  }, [post]);

  const onDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      const newComments = comments.filter(comment => comment.id !== commentId);

      if (newComments.length === 0) {
        setMessage(true);
      }

      setComments(newComments);
    } catch {
      setError(true);
    }
  };

  const onAdd = async ({ name, email, body, id }: Omit<Comment, 'postId'>) => {
    setIsLoading(true);
    setMessage(false);

    try {
      const newComment = await addComment({
        name,
        email,
        body,
        postId: post.id,
        id,
      });

      setComments(prevComments => [...prevComments, newComment]);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && !isWriting ? (
            <Loader />
          ) : (
            <>
              {error && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {message && !error && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!message && !error && (
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
                          onClick={() => onDelete(comment.id)}
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

              {!isWriting && !error && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsWriting(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isWriting && (
          <NewCommentForm error={error} loading={isLoading} onAdd={onAdd} />
        )}
      </div>
    </div>
  );
};
