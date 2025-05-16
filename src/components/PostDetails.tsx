import React, { useState, useEffect } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface PostDetailsProps {
  post: Post;
  onClose: () => void;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);
      setIsCommentFormVisible(false);

      try {
        const url = `/comments?postId=${post.id}`;
        const fetchedComments = await client.get<Comment[]>(url);

        setComments(fetchedComments);
      } catch (err) {
        setError('Failed to load comments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    client.delete(`/comments/${commentId}`).catch(() => {
      setError('Failed to delete comment on server');
    });
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const hasComments = comments.length > 0;
  const hasError = !!error;
  const shouldShowComments = !isLoading && !hasError && hasComments;
  const shouldShowNoCommentsMessage = !isLoading && !hasError && !hasComments;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>

        <button
          type="button"
          className="button is-link is-light"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {shouldShowNoCommentsMessage && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {shouldShowComments && (
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

        {!isLoading && !hasError && !isCommentFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsCommentFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isCommentFormVisible && (
          <NewCommentForm
            postId={post.id}
            onAddComment={handleAddComment}
            onCancel={() => setIsCommentFormVisible(false)}
          />
        )}
      </div>
    </div>
  );
};
