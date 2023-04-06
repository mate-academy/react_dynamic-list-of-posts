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
  isCommentsLoad: boolean,
  isNoComments: boolean,
  onButtonForm: () => void,
  isShowForm: boolean,
  isShowButton: boolean,
  onAddComment: (name: string, email: string, body: string) => Promise<void>,
  isCommentsUpdate: boolean,
  setIsCommentsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCommentDelete: React.Dispatch<React.SetStateAction<boolean>>,
  isNewCommentLoad: boolean,
  onDeleteComment: (commentId: number) => void,
  isCommentDelete: boolean,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isCommentsLoad,
  comments,
  isNoComments,
  onButtonForm,
  isShowForm,
  isShowButton,
  onAddComment,
  isCommentsUpdate,
  setIsCommentsUpdate,
  isNewCommentLoad,
  onDeleteComment,
  isCommentDelete,
  setIsCommentDelete,
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

          {isCommentsLoad && !isNoComments && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {!isNoComments && !isCommentsLoad && (
            <>
              <CommentsList
                comments={comments}
                onDeleteComment={onDeleteComment}
                isCommentDelete={isCommentDelete}
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
            isCommentsUpdate={isCommentsUpdate}
            setIsCommentsUpdate={setIsCommentsUpdate}
            isNewCommentLoad={isNewCommentLoad}
            setIsCommentDelete={setIsCommentDelete}
          />
        )}
      </div>
    </div>
  );
};
