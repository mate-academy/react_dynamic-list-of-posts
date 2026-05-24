import { useEffect, useState } from 'react';
import { addComment, deleteComment, getPostComments } from '../api/comment';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails = ({ post }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [areCommentsLoading, setAreCommentsLoading] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [commentActionError, setCommentActionError] = useState('');

  useEffect(() => {
    setComments([]);
    setAreCommentsLoading(true);
    setHasCommentsError(false);
    setIsFormVisible(false);
    setCommentActionError('');

    getPostComments(post.id)
      .then(setComments)
      .catch(() => {
        setHasCommentsError(true);
      })
      .finally(() => {
        setAreCommentsLoading(false);
      });
  }, [post.id]);

  const handleAddComment = async (commentData: CommentData) => {
    const newComment = await addComment(post.id, commentData);

    setComments(currentComments => [...currentComments, newComment]);
    setCommentActionError('');
  };

  const handleDeleteComment = async (commentToDelete: Comment) => {
    setCommentActionError('');
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentToDelete.id),
    );

    try {
      await deleteComment(commentToDelete.id);
    } catch {
      setComments(currentComments => [...currentComments, commentToDelete]);
      setCommentActionError('Unable to delete a comment');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: `}
          {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {areCommentsLoading && <Loader />}

        {hasCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!areCommentsLoading && !hasCommentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!areCommentsLoading && !hasCommentsError && comments.length > 0 && (
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
                    aria-label="Delete comment"
                    onClick={() => handleDeleteComment(comment)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!areCommentsLoading && !hasCommentsError && commentActionError && (
          <div className="notification is-danger">{commentActionError}</div>
        )}

        {!areCommentsLoading && !isFormVisible && !hasCommentsError && (
          <button
            type="button"
            className="button is-link"
            data-cy="WriteCommentButton"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isFormVisible && !hasCommentsError && (
          <NewCommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
