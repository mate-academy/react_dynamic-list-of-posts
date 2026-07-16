import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deletingCommentIds] = useState<number[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIsFormVisible(false);
    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    const commentToRestore = comments.find(comment => comment.id === commentId);

    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    client.delete(`/comments/${commentId}`).catch(() => {
      if (commentToRestore) {
        setComments(prevComments => [...prevComments, commentToRestore]);
      }

      // eslint-disable-next-line no-console
      console.error('Failed to delete comment');
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

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
                className={classNames('delete', 'is-small', {
                  'is-loading': deletingCommentIds.includes(comment.id),
                })}
                aria-label="delete"
                onClick={() => handleDeleteComment(comment.id)}
                disabled={deletingCommentIds.includes(comment.id)}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}

        {!isLoading && !hasError && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !hasError && isFormVisible && (
          <NewCommentForm
            postId={post.id}
            onAddComment={newComment =>
              setComments(prev => [...prev, newComment])
            }
          />
        )}
      </div>
    </div>
  );
};
