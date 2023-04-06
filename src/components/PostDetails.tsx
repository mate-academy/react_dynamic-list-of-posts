import React from 'react';
import classNames from 'classnames';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentsList } from './CommentsList';

type Props = {
  selectedPost: Post | null,
  comments: Comment[] | null,
  isCommentsLoadError: boolean,
  isNoComments: boolean,
  onButtonForm: () => void,
  isShowForm: boolean,
  isShowButton: boolean,
  onAddComment: (name: string, email: string, body: string) => Promise<void>,
  isCommentsUpdateError: boolean,
  setIsCommentsUpdateError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCommentDeleteError: React.Dispatch<React.SetStateAction<boolean>>,
  isNewCommentLoad: boolean,
  onDeleteComment: (commentId: number) => void,
  isCommentDeleteError: boolean,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isCommentsLoadError,
  comments,
  isNoComments,
  onButtonForm,
  isShowForm,
  isShowButton,
  onAddComment,
  isCommentsUpdateError,
  setIsCommentsUpdateError,
  isNewCommentLoad,
  onDeleteComment,
  isCommentDeleteError,
  setIsCommentDeleteError,
}) => {
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
          {isNoComments && <Loader />}

          {isCommentsLoadError && !isNoComments && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {!isNoComments && !isCommentsLoadError && (
            <>
              <CommentsList
                comments={comments}
                onDeleteComment={onDeleteComment}
                isCommentDeleteError={isCommentDeleteError}
              />

              <button
                data-cy="WriteCommentButton"
                type="button"
                className={classNames(
                  'button',
                  'is-link',
                  { 'is-hidden': isShowButton },
                )}
                onClick={onButtonForm}
              >
                Write a comment
              </button>
            </>
          )}
        </div>
        {isShowForm && (
          <NewCommentForm
            onAddComment={onAddComment}
            isCommentsUpdateError={isCommentsUpdateError}
            setIsCommentsUpdateError={setIsCommentsUpdateError}
            isNewCommentLoad={isNewCommentLoad}
            setIsCommentDeleteError={setIsCommentDeleteError}
          />
        )}
      </div>
    </div>
  );
};
