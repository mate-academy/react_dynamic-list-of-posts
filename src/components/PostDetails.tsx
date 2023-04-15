import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentsList } from './CommentsList';

type Props = {
  activePost: Post,
  postComments: Comment[] | null,
  isCommentsError: boolean,
  isNewCommentForm: boolean,
  setIsNewCommentForm: React.Dispatch<React.SetStateAction<boolean>>,
  postComment: (data: Omit<Comment, 'id'>) => Promise<void>,
  isCommentLoading: boolean,
  removeComment: (id: number) => Promise<void>
};

export const PostDetails: React.FC<Props> = ({
  activePost,
  postComments,
  isCommentsError,
  isNewCommentForm,
  setIsNewCommentForm,
  postComment,
  isCommentLoading,
  removeComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {activePost.title}
        </h2>

        <p data-cy="PostBody">
          {activePost.body}
        </p>
      </div>

      <div className="block">
        {(postComments === null && !isCommentsError) && <Loader />}

        {isCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isCommentsError || (
          <>
            {!postComments?.length && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {postComments && (
              <CommentsList
                postComments={postComments}
                removeComment={removeComment}
              />
            )}

            {isNewCommentForm || (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsNewCommentForm(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {(isNewCommentForm && !isCommentsError) && (
        <NewCommentForm
          postComment={postComment}
          activePostId={activePost.id}
          isCommentLoading={isCommentLoading}
        />
      )}
    </div>
  );
};
