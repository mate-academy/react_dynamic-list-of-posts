import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [hasDeleteError, setHasDeleteError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasLoadingError(false);
    setHasDeleteError(false);
    setComments([]);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setHasLoadingError(true))
      .finally(() => {
        setIsLoading(false);
        setIsFormVisible(false);
      });
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    setHasDeleteError(false);

    const previousComments = comments;

    setComments(prev => prev.filter(c => c.id !== commentId));

    deleteComment(commentId).catch(() => {
      setHasDeleteError(true);
      setComments(previousComments);
    });
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
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
        {!isLoading && hasLoadingError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
        {hasDeleteError && (
          <div className="notification is-danger">
            Unable to delete a comment
          </div>
        )}
        {!isLoading && !hasLoadingError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!isLoading && !hasLoadingError && comments.length > 0 && (
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
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isFormVisible && !isLoading && !hasLoadingError && (
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

      {isFormVisible && (
        <NewCommentForm postId={post.id} onAddComment={handleAddComment} />
      )}
    </div>
  );
};
