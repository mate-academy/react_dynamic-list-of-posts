import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData, CommentError } from '../types/Comment';
import { Post } from '../types/Post';
import { Fields } from '../types/Fields';
import { CommentsList } from './CommentsList';

type Props = {
  comments: Comment[];
  post: Post;
  error: string;
  isLoading: boolean;
  onAddComment: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmit: boolean;
  onCommentDelete: (id: number) => void;
  newComment: CommentData | null;
  handleChangeField: (value: string, field: keyof typeof Fields) => void;
  commentError: CommentError | null;
  isFormDisplayed: boolean;
  setIsFormDisplayed: (arg: boolean) => void;
  reset: () => void;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  post,
  error,
  isLoading,
  onAddComment,
  isSubmit,
  onCommentDelete,
  newComment,
  handleChangeField,
  commentError,
  isFormDisplayed,
  setIsFormDisplayed,
  reset,
}) => {
  const commentsContent = !comments.length
    ? (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    )
    : <CommentsList comments={comments} onCommentDelete={onCommentDelete} />;

  const newCommentButton = !isFormDisplayed && (
    <button
      data-cy="WriteCommentButton"
      type="button"
      className="button is-link"
      onClick={() => setIsFormDisplayed(true)}
    >
      Write a comment
    </button>
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!isLoading && (
            <>
              {commentsContent}
              {newCommentButton}
            </>
          )}

        </div>

        {isFormDisplayed && (
          <NewCommentForm
            onAddComment={onAddComment}
            isSubmit={isSubmit}
            newComment={newComment}
            handleChangeField={handleChangeField}
            commentError={commentError}
            reset={reset}
          />
        )}
      </div>
    </div>
  );
};
