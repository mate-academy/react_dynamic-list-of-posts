import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onAddComment = (newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  };

  const onDeleteComment = (commentId: number) => {
    setErrorMessage('');

    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    client.delete(`/comments/${commentId}`).catch(() => {
      setErrorMessage('Unable to delete a comment');
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setIsWriting(false);
    setErrorMessage('');

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(data => {
        setComments(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post?.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !isError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !isError && comments.length > 0 && (
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
                    onClick={() => onDeleteComment(comment.id)}
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

        {errorMessage && (
          <div className="notification is-danger" data-cy="ErrorNotification">
            {errorMessage}
          </div>
        )}

        {!isLoading && !isError && !isWriting && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsWriting(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isWriting && (
        <NewCommentForm postId={post.id} onAddComment={onAddComment} />
      )}
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
