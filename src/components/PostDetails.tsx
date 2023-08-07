import React from 'react';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { ErrorTypes } from '../constants';

type Props = {
  post: Post | null;
  errorType: ErrorTypes | null;
  comments: Comment[];
  isFetching: boolean;
  isCommentFormOpen: boolean;
  setErrorType: React.Dispatch<React.SetStateAction<ErrorTypes | null>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  openCommentsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  errorType,
  isFetching,
  setComments,
  setErrorType,
  openCommentsForm,
  isCommentFormOpen,
}) => {
  const handleOpenCommentForm = () => {
    openCommentsForm(true);
  };

  const errorTypes: ErrorTypes[] = [
    ErrorTypes.ADD,
    ErrorTypes.DELETE,
    ErrorTypes.COMMENTS,
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
          {isFetching && (
            <Loader />
          )}

          {(errorType && errorTypes.includes(errorType)) && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              { errorType }
            </div>
          )}

          {(errorType !== ErrorTypes.COMMENTS) && (
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
