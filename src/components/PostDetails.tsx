import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { ErrorType } from '../types/ErrorType';
import { CommentList } from './CommentList';

type Props = {
  selectedPost: Post | null,
  comments: Comment[],
  isLoadingComments: boolean,
  isCommentError: ErrorType,
  onAddComment: (data: CommentData) => void,
  isPostComment: boolean,
  onDeleteComment: (commentId: number) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isLoadingComments,
  isCommentError,
  onAddComment,
  isPostComment,
  onDeleteComment,
}) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const handleOpenForm = () => {
    setIsOpenForm(true);
  };

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
          {isLoadingComments && <Loader />}

          {isCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {isCommentError}
            </div>
          )}

          {!comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <CommentList
              comments={comments}
              onDeleteComment={onDeleteComment}
            />
          )}

        </div>
        {isOpenForm ? (
          <NewCommentForm
            selectedPost={selectedPost}
            isPostComment={isPostComment}
            onAddComment={onAddComment}
          />
        ) : (
          <>
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOpenForm}
            >
              Write a comment
            </button>
          </>
        )}
      </div>
    </div>
  );
};
