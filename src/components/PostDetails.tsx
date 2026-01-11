import { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Notification } from '../types/Notification';

interface PostDetailsProps {
  comments: Comment[];
  post: Post;
  addNewComment: (newComment: Comment) => void;
  deleteComment: (id: number) => void;
  notification: Notification | null;
  loading: boolean;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  comments,
  post,
  addNewComment,
  deleteComment,
  notification,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [post.id]);

  const openForm = () => {
    setIsOpen(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      {notification?.type === 'error' && (
        <div className="notification is-danger" data-cy="CommentsError">
          {notification.message}
        </div>
      )}

      {loading && <Loader />}

      {notification?.type !== 'error' && !loading && comments.length === 0 && (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}

      <div className="block">
        {!loading && comments.length > 0 && (
          <p className="title is-4">Comments:</p>
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
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}

        {!isOpen &&
          (!notification || notification.type === 'warning') &&
          !loading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={openForm}
            >
              Write a comment
            </button>
          )}
      </div>

      {isOpen && (
        <NewCommentForm addNewComment={addNewComment} postId={post.id} />
      )}
    </div>
  );
};
