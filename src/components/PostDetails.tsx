import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
  selectedUserPost: Post;
  commentErrorMessage: string;
  userComments: Comment[];
  isCommentLoading: boolean;
  createNewComment: (
    currentPostId: number,
    { name, email, body }: CommentData,
  ) => Promise<void>;
  deleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  isFormOpen,
  setIsFormOpen,
  selectedUserPost,
  commentErrorMessage,
  userComments,
  isCommentLoading,
  createNewComment,
  deleteComment,
}) => {
  const isNoComments =
    !isCommentLoading && userComments.length === 0 && !commentErrorMessage;

  const isCommentListAvailable =
    userComments.length > 0 && !isCommentLoading && !commentErrorMessage;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedUserPost.id}: ${selectedUserPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedUserPost.body}</p>
        </div>

        <div className="block">
          {isCommentLoading && <Loader />}

          {!isCommentLoading && commentErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentErrorMessage}
            </div>
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentListAvailable && (
            <>
              {' '}
              <p className="title is-4">Comments:</p>
              {userComments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteComment(comment.id)}
                    ></button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isCommentLoading && !isFormOpen && !commentErrorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && !isCommentLoading && (
          <NewCommentForm
            createNewComment={createNewComment}
            currentPostId={selectedUserPost.id}
          />
        )}
      </div>
    </div>
  );
};
