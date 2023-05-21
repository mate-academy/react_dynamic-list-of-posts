import React from 'react';
import { Loader } from './Loader';
import { CommentsList } from './CommentsList';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Reset } from '../types/Reset';

type Props = {
  comments: Comment[] | null,
  postTitle?: string,
  postBody?: string,
  postId?: number,
  isWrongPostResponse: boolean,
  isPostLoading: boolean,
  isCommentForm: boolean,
  isLoadingNewComment: boolean,
  isDangerSubmit: boolean,
  isWarningUpdate: boolean,
  setIsCommentForm: (value: boolean) => void,
  onHandleFormSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    reset: (inputType: Reset) => void,
    name: string,
    email: string,
    body: string,
    postId?: number,
  ) => void,
  canselDangerInput: () => void,
  onHandleDeleteComment: (id: number) => void,
};

export const PostDetails: React.FC<Props> = ({
  comments,
  postTitle,
  postBody,
  isWrongPostResponse,
  isPostLoading,
  postId,
  isCommentForm,
  isLoadingNewComment,
  isDangerSubmit,
  isWarningUpdate,
  onHandleFormSubmit,
  setIsCommentForm,
  canselDangerInput,
  onHandleDeleteComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postId}: ${postTitle}`}
          </h2>

          <p data-cy="PostBody">
            {postBody}
          </p>
        </div>

        <div className="block">
          {isPostLoading && <Loader />}

          {isWrongPostResponse && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!isPostLoading && !isWrongPostResponse && (
            <>
              <CommentsList
                comments={comments}
                onHandleDeleteComment={onHandleDeleteComment}
              />
              {!isCommentForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsCommentForm(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isCommentForm && (
          <NewCommentForm
            isLoadingNewComment={isLoadingNewComment}
            isDangerSubmit={isDangerSubmit}
            isWarningUpdate={isWarningUpdate}
            postId={postId}
            onHandleFormSubmit={onHandleFormSubmit}
            canselDangerInput={canselDangerInput}
          />
        )}
      </div>
    </div>
  );
};
