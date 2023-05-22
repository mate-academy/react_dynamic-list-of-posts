import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComments } from '../api/posts';

type Props = {
  selectedPost: Post;
  comments: Comment[] | null;
  isCommentError: boolean;
  onError(value: boolean): void;
  canWriteComment: boolean;
  setCanWriteComment(value: boolean): void;
  onAdd(comment: Comment[] | null): void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isCommentError,
  onError,
  canWriteComment,
  setCanWriteComment,
  onAdd,
}) => {
  const handleShowForm = () => {
    setCanWriteComment(true);
  };

  const removeCommentsFromServer = (targetComment: Comment) => {
    if (comments) {
      onAdd(comments.filter(comment => comment.id !== targetComment.id));
    }

    deleteComments(targetComment.id)
      .then(() => {})
      .catch(() => onError(true));
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
          {!comments && !isCommentError && <Loader />}

          {isCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments?.length === 0 && !isCommentError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments?.length > 0 && !isCommentError && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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
                      onClick={() => removeCommentsFromServer(comment)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!canWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {canWriteComment && !isCommentError && (
          <NewCommentForm
            onAdd={onAdd}
            selectedPostId={selectedPost?.id}
            comments={comments}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
};
