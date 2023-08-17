import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComments, getComments } from '../api/comments';
import { ErrorMessage } from '../enum/ErrorMessage';
import { CommentItem } from './Comment/Comment';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { title, body, id } = post;
  const [comments, setComments] = useState<Comment [] | null>(null);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getComments(id)
      .then(setComments)
      .catch(() => setError(ErrorMessage.Comments))
      .finally(() => {
        setIsLoading(false);
      });
  }, [post]);

  const deleteComment = (commentId: number) => () => {
    if (comments && comments?.length > 0) {
      const newComments = comments?.filter(comment => comment.id !== commentId);

      deleteComments(commentId)
        .then(() => setComments(newComments));
    }
  };

  const handleShowForm = (commentId: number) => () => {
    setShowForm(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {title}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isLoading && (<Loader />)}

          {error === ErrorMessage.Comments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments.length > 0
          && (<p className="title is-4">Comments:</p>)}

          {comments?.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              deleteComment={deleteComment}
            />
          ))}

          {showForm !== id
            ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleShowForm(id)}
              >
                Write a comment
              </button>
            )
            : (
              <NewCommentForm
                postId={id}
                setComments={setComments}
                // comments={comments}
              />
            )}
        </div>
      </div>
    </div>
  );
};
