import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { ErrorType } from '../types/ErrorType';
import { CommentsList } from './CommentList';

type Props = {
  post: Post | null,
  comments: Comment[],
  errorType: ErrorType | null,
  setErrorType: React.Dispatch<React.SetStateAction<ErrorType | null>>,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  isFetch: boolean,
  isCommentFormOpen: boolean,
  openFormForComment: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  errorType,
  setErrorType,
  setComments,
  isFetch,
  isCommentFormOpen,
  openFormForComment,
}) => {
  const handleOpenCommentForm = () => {
    openFormForComment(true);
  };

  const errorTypes: ErrorType[] = [
    ErrorType.ADD,
    ErrorType.DELETE,
    ErrorType.COMMENTS,
  ];

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isFetch ? (
            <Loader />
          ) : (
            <>
              {(errorType && errorTypes.includes(errorType)) && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorType}
                </div>
              )}

              {(errorType !== ErrorType.COMMENTS) && (
                <CommentsList
                  comments={comments}
                  setErrorType={setErrorType}
                  setComments={setComments}
                />
              )}

              {!isCommentFormOpen && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleOpenCommentForm}
                >
                  Write a comment
                </button>
              )}
            </>
          )}

        </div>

        {isCommentFormOpen && (
          <NewCommentForm
            post={post}
            setComments={setComments}
            setErrorType={setErrorType}
          />
        )}
      </div>
    </div>
  );
};
