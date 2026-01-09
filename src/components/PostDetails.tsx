import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  post: Post;
};

export const PostDetails = ({ post }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    setIsFormVisible(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const onAddComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const handleDelete = (commentId: number) => {
    const commentsBackup = [...comments];

    setComments(prev => prev.filter(c => c.id !== commentId));
    setDeletingId(commentId);

    client
      .delete(`/comments/${commentId}`)
      .catch(() => {
        setComments(commentsBackup);
        alert('Could not delete comment');
      })
      .finally(() => setDeletingId(null));
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

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        type="button"
                        className={classNames('delete', 'is-small', {
                          'is-loading': deletingId === comment.id,
                        })}
                        data-cy="CommentDelete"
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

            {!isFormVisible ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            ) : (
              <NewCommentForm onAdd={onAddComment} postId={post.id} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
