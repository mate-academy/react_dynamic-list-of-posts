import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentsList } from './CommentsList';

type Props = {
  post: Post | null;
  comments: Comment[];
  isOpenedPost: boolean;
  isCommentsLoading: boolean;
  commentsError: string;
  handleDeleteComment: (id: number) => void;
  isCommentFormOpen: boolean;
  handleCommentFormOpen: (isCommentFormOpen: boolean) => void;
  handleSubmitForm: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<boolean>;
  isNewCommentLoading: boolean;
  nameError: string;
  emailError: string;
  bodyError: string;
  handleNameError: (nameError: string) => void;
  handleEmailError: (emailError: string) => void;
  handleBodyError: (bodyError: string) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isCommentsLoading,
  commentsError,
  handleDeleteComment,
  isCommentFormOpen,
  handleCommentFormOpen,
  handleSubmitForm,
  isNewCommentLoading,
  nameError,
  emailError,
  bodyError,
  handleNameError,
  handleEmailError,
  handleBodyError,
}) => {
  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            {commentsError}
          </div>
        )}

        {comments.length === 0 && !isCommentsLoading && !commentsError ? (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        ) : (
          <CommentsList
            comments={comments}
            handleDeleteComment={handleDeleteComment}
          />
        )}
        {!isCommentFormOpen && !isCommentsLoading && !commentsError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => handleCommentFormOpen(isCommentFormOpen)}
          >
            Write a comment
          </button>
        )}
      </div>
      {isCommentFormOpen && (
        <NewCommentForm
          nameError={nameError}
          emailError={emailError}
          bodyError={bodyError}
          postId={post.id}
          handleSubmitForm={handleSubmitForm}
          isNewCommentLoading={isNewCommentLoading}
          handleNameError={handleNameError}
          handleEmailError={handleEmailError}
          handleBodyError={handleBodyError}
        />
      )}
    </div>
  );
};
