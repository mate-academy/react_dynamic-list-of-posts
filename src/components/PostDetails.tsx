import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as services from '../api';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState('');
  const { title, id: postId, body } = post;

  useEffect(() => {
    setIsCommentsLoading(true);
    setIsFormVisible(false);

    services
      .getComments(postId)
      .then(setComments)
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [postId]);

  function handleDeleteComment(commentId: number) {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    services.deleteComment(commentId).catch(() => {
      setError('Unable to delete the comment!');
    });
  }

  async function handleCreateComment(newComment: Comment) {
    return services
      .createNewComment(newComment)
      .then((data: Comment) => {
        setComments(prev => [...prev, data]);
      })
      .catch(() => setError('Unable to create the comment!'));
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${postId}: ${title}`}</h2>

        <p data-cy="PostBody">{body}</p>
      </div>

      <div className="block">
        {isCommentsLoading ? (
          <Loader />
        ) : (
          <>
            {error ? (
              <div className="notification is-danger" data-cy="CommentsError">
                {error}
              </div>
            ) : null}

            {(comments.length === 0 && !error && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )) || <p className="title is-4">Comments:</p>}

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

            {!isFormVisible && !error && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {isFormVisible && (
        <NewCommentForm postId={postId} onSubmit={handleCreateComment} />
      )}
    </div>
  );
};
