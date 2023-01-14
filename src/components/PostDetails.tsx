import React, { useCallback, useEffect, useState } from 'react';
import { addComment, deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Errors } from '../types/Errors';
import { Post } from '../types/Post';
import { CommentItem } from './CommentItem';
import { ErrorNotification } from './ErrorNotification';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  postDetails: Post;
  isNewCommentFormOpened: boolean;
  onOpenNewCommentForm: () => void;
};

export const PostDetails: React.FC<Props> = React.memo(
  ({
    postDetails,
    isNewCommentFormOpened,
    onOpenNewCommentForm,
  }) => {
    const {
      id,
      title,
      body,
    } = postDetails;

    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingComment, setIsAddingComment] = useState(false);
    const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);
    const [isCommentsLoadingError, setIsCommentsLoadingError] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      setComments([]);

      getComments(id)
        .then(loadedComments => {
          setComments(loadedComments);
          setIsCommentsLoaded(true);
          setIsCommentsLoadingError(false);
        })
        .catch(() => {
          setIsCommentsLoadingError(true);
        })
        .finally(() => setIsLoading(false));
    }, [id]);

    const addNewComment = (comment: Omit<Comment, 'id'>) => {
      setIsAddingComment(true);

      addComment(comment)
        .then(addedComment => (
          setComments(prevComments => [...prevComments, addedComment])
        ))
        .finally(() => setIsAddingComment(false));
    };

    const deleteSelectedComment = useCallback((commentId: number) => {
      deleteComment(commentId);

      setComments(prevComments => prevComments.filter(comment => (
        comment.id !== commentId
      )));
    }, []);

    const isLoadedCommentsExist = !isLoading
      && !isCommentsLoadingError
      && isCommentsLoaded
      && comments.length > 0;

    const isLoadedCommentsNotExist = !isLoading
      && !isCommentsLoadingError
      && isCommentsLoaded
      && !comments.length;

    const isLoadedError = !isLoading && isCommentsLoadingError;

    const isVisibleButton = !isLoading
      && !isCommentsLoadingError
      && !isNewCommentFormOpened;

    return (
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${id}: ${title}`}
            </h2>

            <p data-cy="PostBody">
              {body}
            </p>
          </div>

          <div className="block">
            {isLoading && <Loader />}

            {isLoadedError && (
              <ErrorNotification error={Errors.CommentsError} />
            )}

            {isLoadedCommentsNotExist && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {isLoadedCommentsExist && (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={deleteSelectedComment}
                  />
                ))}
              </>
            )}

            {isVisibleButton && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={onOpenNewCommentForm}
              >
                Write a comment
              </button>
            )}
          </div>

          {isNewCommentFormOpened && (
            <NewCommentForm
              onAdd={addNewComment}
              isLoading={isAddingComment}
              postId={id}
            />
          )}
        </div>
      </div>
    );
  },
);
