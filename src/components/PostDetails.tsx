import React from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { ErrorMessage } from '../types/ErrorMessage';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  isCommentsError: boolean;
  isLoading: boolean;
  isFormVisible: boolean;
  isDeleteError: boolean;
  onDelete: (commentId: number) => void;
  onAdd: (comment: Comment) => void;
  showForm: (isForm: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isCommentsError,
  isLoading,
  isFormVisible,
  isDeleteError,
  onDelete,
  onAdd,
  showForm,
}) => {
  const showCommentForm = () => showForm(true);

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
          {isLoading && (
            <Loader />
          )}

          {isCommentsError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {ErrorMessage.COMMENTS}
            </div>
          ) : (
            <>
              {(!comments.length && !isLoading) && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {(comments.length > 0 && !isLoading) && (
                <p className="title is-4">Comments:</p>
              )}

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a
                      href={comment.email}
                      data-cy="CommentAuthor"
                    >
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => onDelete(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {isDeleteError && (
                <div
                  className="notification is-danger"
                  data-cy="PostsLoadingError"
                >
                  {ErrorMessage.DELETE}
                </div>
              )}

              {(!isLoading && !isFormVisible) && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={showCommentForm}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm
            selectedPost={selectedPost}
            onAdd={onAdd}
          />
        )}
      </div>
    </div>
  );
};
