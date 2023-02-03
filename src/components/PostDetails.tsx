import React, { Dispatch, SetStateAction } from 'react';
import { Comment } from '../types/Comment';
import { ErrorType } from '../types/ErrorType';
import { Loading } from '../types/Loading';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null;
  error: ErrorType;
  isLoading: Loading;
  comments: Comment[];
  setComments:Dispatch<SetStateAction<Comment[]>>
  isFormOpen: boolean;
  setFormOpen:Dispatch<SetStateAction<boolean>>
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  error,
  isLoading,
  comments,
  setComments,
  isFormOpen,
  setFormOpen,
}) => {
  const hasNoComments = !comments.length
  && selectedPost
  && !error
  && !isLoading;

  const isButtonVisible = !isLoading && !isFormOpen && !error;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading === Loading.Comments && (
            <Loader />
          )}

          {error === ErrorType.CommentsLoading && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) }

          {selectedPost && comments.length > 0 && (
            <CommentsList
              comments={comments}
              setComments={setComments}
            />
          )}

          {isFormOpen && (
            <NewCommentForm
              setComments={setComments}
              selectedPost={selectedPost}
            />
          )}

          { isButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
