import { useEffect, useState } from 'react';
import { Post, Comment, CommentFormData } from '../../types';
import { client } from '../../utils/fetchClient';
import { CommentForm } from '../CommentForm/CommentForm';
import './PostDetails.scss';

interface Props {
  post: Post;
  onClose: () => void;
}

export const PostDetails: React.FC<Props> = ({ post, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    setShowCommentForm(false);
    const loadComments = async () => {
      setIsLoading(true);
      setError('');

      try {
        const loadedComments = await client.get<Comment[]>(
          `/comments?postId=${post.id}`,
        );

        setComments(loadedComments);
      } catch (e) {
        setError('Failed to load comments');
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [post.id]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await client.delete(`/comments/${commentId}`);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
    } catch (e) {
      setError('Failed to delete comment');
    }
  };

  const handleAddComment = (newComment: CommentFormData) => {
    setComments(prevComments => [...prevComments, newComment as Comment]);
  };

  return (
    <div className="box" data-cy="PostDetails">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h2 className="title is-4" data-cy="PostTitle">
              #{post.id}: {post.title}
            </h2>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <button
              type="button"
              className="delete is-large"
              data-cy="CloseButton"
              onClick={onClose}
            />
          </div>
        </div>
      </div>

      <div className="content">
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="comments">
        <h3 className="title is-5">Comments</h3>

        {isLoading && (
          <div className="loader" data-cy="Loader">
            Loading comments...
          </div>
        )}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Failed to load comments
          </div>
        )}

        {!isLoading && !error && comments.length === 0 && (
          <div className="notification is-warning" data-cy="NoCommentsMessage">
            No comments yet
          </div>
        )}

        {comments.map(comment => (
          <div key={comment.id} className="box" data-cy="Comment">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="title is-6">
                      <a
                        href={`mailto:${comment.email}`}
                        className="has-text-link"
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                    </p>
                    <p className="is-size-6 has-text-grey">{comment.email}</p>
                  </div>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <button
                    type="button"
                    className="delete"
                    data-cy="DeleteButton"
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                </div>
              </div>
            </div>
            <div className="content">
              <p data-cy="CommentBody" className="content">
                {comment.body}
              </p>
            </div>
          </div>
        ))}

        {!isLoading && !error && !showCommentForm && (
          <button
            type="button"
            className="button is-primary"
            data-cy="WriteCommentButton"
            onClick={() => setShowCommentForm(true)}
          >
            Write a comment
          </button>
        )}

        {!isLoading && !error && showCommentForm && (
          <CommentForm
            postId={post.id}
            onSubmit={handleAddComment}
            onCancel={() => setShowCommentForm(false)}
          />
        )}
      </div>
    </div>
  );
};
