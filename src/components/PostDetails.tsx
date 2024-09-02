import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { StateContext } from '../store/store';
import { Comment } from '../types/Comment';
import { getComments } from '../api/fetches';
import { CommentItem } from './CommentItem';

export const PostDetails: React.FC = () => {
  const { currentPost, visibleForm, setVisibleForm } = useContext(StateContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [comments, setComments] = useState<Comment[]>([]);

  const [isError, setIsError] = useState<boolean>(false);

  const [deletionError, setDeletionError] = useState<boolean>(false);

  const handleShowForm = () => {
    setVisibleForm(true);
  };

  const onDeleteItem = (commentId: number) => {
    setComments(prevState =>
      prevState.filter(comment => comment.id !== commentId),
    );
  };

  const onAddComment = (newComment: Comment) => {
    setComments((prevComments: Comment[]) => [...prevComments, newComment]);
  };

  useEffect(() => {
    if (currentPost?.id) {
      setIsLoading(true);

      setComments([]);

      getComments(currentPost?.id)
        .then(response => {
          setComments(response);

          setIsError(false);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentPost?.id]);

  const approveNoComents =
    !comments.length && !isLoading && !isError && !deletionError;

  const approveCommentsQtyComments =
    !isLoading && !!comments.length && !isError && !deletionError;

  const approveLoadingComments = !isLoading && !deletionError;

  const approveShovingCommentButton =
    !isLoading && !visibleForm && !isError && !deletionError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">{`${currentPost?.body}`}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {(isError || deletionError) && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {approveNoComents && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {approveCommentsQtyComments && (
            <p className="title is-4">Comments:</p>
          )}
          {approveLoadingComments &&
            comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                setDeletionError={setDeletionError}
                onDeleteItem={onDeleteItem}
              />
            ))}

          {approveShovingCommentButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowForm}
            >
              Write a comment
            </button>
          )}
        </div>
        {visibleForm && <NewCommentForm onAddComment={onAddComment} />}
      </div>
    </div>
  );
};
