import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  selectedPost: Post;
  comments: Comment[];
  isLoadingComments: boolean;
  isCommentError: boolean;
  isAddCommentError: boolean;
  isCommentFormVisible: boolean;
  openCommentForm: () => void;
  clearAddCommentError: () => void;
  onSubmit: (data: CommentData) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isLoadingComments,
  isCommentError,
  isAddCommentError,
  isCommentFormVisible,
  openCommentForm,
  clearAddCommentError,
  onSubmit,
  deleteComment,
}) => {
  const showWriteButton =
    !isLoadingComments && !isCommentError && !isCommentFormVisible;

  const showCommentForm =
    !isLoadingComments && !isCommentError && isCommentFormVisible;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {isLoadingComments && <Loader />}

        {!isLoadingComments && isCommentError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !isCommentError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && !isCommentError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map((comment: Comment) => (
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

        {showWriteButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={openCommentForm}
          >
            Write a comment
          </button>
        )}
      </div>
      {showCommentForm && (
        <NewCommentForm
          isAddCommentError={isAddCommentError}
          clearAddCommentError={clearAddCommentError}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};
