import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { ErrorMessage } from '../types/errors';
import { CommentsList } from './commetsList';
import { Comment } from '../types/Comment';

interface Props {
  post: Post | null;
  errorMessage: ErrorMessage | null;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage | null>>;
  isFetching: boolean;
  isCommentFormOpen: boolean;
  openCommentsForm: (value: boolean) => void;
}
export const PostDetails: React.FC<Props> = ({
  post,
  errorMessage,
  comments,
  setErrorMessage,
  setComments,
  isFetching,
  isCommentFormOpen,
  openCommentsForm,
}) => {
  const handleOpenCommentForm = () => {
    openCommentsForm(true);
  };

  const errorTypes: ErrorMessage[] = [
    ErrorMessage.ADD,
    ErrorMessage.DELETE,
    ErrorMessage.COMMENTS,
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

          {errorMessage && errorTypes.includes(errorMessage)
            && (
              <div className="notification is-danger" data-cy="CommentsError">
                {errorMessage}
              </div>
            )}

          {(errorMessage !== ErrorMessage.COMMENTS)
            && (
              <CommentsList
                comments={comments}
                setComments={setComments}
                setErrorMessage={setErrorMessage}
              />
            )}

          {isCommentFormOpen
            && (
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

        <NewCommentForm
          post={post}
          setComments={setComments}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </div>
  );
};
