import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

interface PostDetailsProps {
  post: Post;
}

export const PostDetails = ({ post }: PostDetailsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    setCommentsLoading(true);
    setCommentsError(false);
    setComments([]);
    setShowCommentForm(false);
    setDeleteError(null);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(data => {
        if (isCurrent) {
          setComments(data);
          setCommentsLoading(false);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setCommentsError(true);
          setCommentsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    setDeleteError(null);
    const removedComment = comments.find(c => c.id === commentId);

    if (removedComment) {
      setComments(prev => prev.filter(c => c.id !== commentId));
      client.delete(`/comments/${commentId}`).catch(() => {
        setComments(prev =>
          [...prev, removedComment].sort((a, b) => a.id - b.id),
        );
        setDeleteError('Unable to delete a comment');
      });
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const showNoComments =
    !commentsLoading && !commentsError && comments.length === 0;
  const showComments =
    !commentsLoading && !commentsError && comments.length > 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {commentsLoading && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {showNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showComments && <p className="title is-4">Comments:</p>}

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

        {deleteError && (
          <div className="notification is-danger" data-cy="DeleteCommentError">
            Unable to delete a comment
          </div>
        )}

        {!showCommentForm && !commentsLoading && !commentsError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowCommentForm(true)}
          >
            Write a comment
          </button>
        )}

        {showCommentForm && (
          <NewCommentForm postId={post.id} onSubmit={handleCommentAdded} />
        )}
      </div>
    </div>
  );
};
