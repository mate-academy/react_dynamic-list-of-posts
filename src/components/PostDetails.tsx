import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

interface Props {
  post: Post | null;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [commentDeleteError, setCommentDeleteError] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setCommentDeleteError(false);
    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsFormVisible(false);
  }, [post]);

  const addComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const deleteComment = (commentId: number) => {
    const originalComments = [...comments];

    setComments(prevComments => prevComments.filter(c => c.id !== commentId));
    setCommentDeleteError(false);

    client.delete(`/comments/${commentId}`).catch(() => {
      setComments(originalComments);
      setCommentDeleteError(true);
    });
  };

  if (!post) {
    return null;
  }

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
        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
        {!isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!isLoading && !hasError && comments.length > 0 && (
          <p className="title is-4" data-cy="CommentsMessage">
            Comments:
          </p>
        )}

        {commentDeleteError && (
          <div className="notification is-danger" data-cy="CommentDeleteError">
            Something went wrong while deleting the comment
          </div>
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
                onClick={() => deleteComment(comment.id)}
              >
                X
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}

        {!isLoading && !isFormVisible && !hasError && (
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
      {isFormVisible && <NewCommentForm postId={post.id} onAdd={addComment} />}
    </div>
  );
};
