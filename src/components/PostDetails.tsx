import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/comments';

type Props = {
  post: Post | null;
  setError: (message: string) => void;
  error: string;
};

export const PostDetails: React.FC<Props> = ({
  post,
  setError,
  error,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadApiComments = async (postId: number) => {
    try {
      setIsLoading(true);
      const data = await getComments(postId);

      if (!data.length) {
        setError('No comments yet');
      }

      setComments(data);
    } catch {
      setError('Unable to get comments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (post?.id) {
      loadApiComments(post.id);
      setError('');
    }
  }, [post]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    setComments((current) => {
      return current.filter(comment => comment.id !== commentId);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && (<Loader />)}

          { error === 'Something went wrong!' && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isLoading && (
            <>
              <p className="title is-4">Comments:</p>
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
                      onClick={() => handleDelete(comment.id)}
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

          {!isNewComment && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isNewComment && (
          <NewCommentForm
            setComments={setComments}
            postId={post?.id || 0}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
