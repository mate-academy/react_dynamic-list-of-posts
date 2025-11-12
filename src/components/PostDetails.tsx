import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment as AppComment, CommentData } from '../types/Comment';
import { TypeErrorMessages } from '../types/ErrorMessages';

interface Props {
  comments: AppComment[];
  selectedPost: Post | null;
  loadingComments: boolean;
  errorMes: TypeErrorMessages | null;
  showForm: boolean;
  onNewComment: () => void;
  addNewComment: (postId: number, data: CommentData) => Promise<AppComment>;
  deleteComment: (commentId: number) => Promise<void>;
}

export const PostDetails: React.FC<Props> = ({
  comments,
  selectedPost,
  loadingComments,
  errorMes,
  showForm,
  onNewComment,
  addNewComment,
  deleteComment,
}) => {
  const [deleteErr, setDeleteErr] = useState<TypeErrorMessages | null>(null);
  const showButton =
    !loadingComments && errorMes !== TypeErrorMessages.Wrong && !showForm;

  const onDelete = async (commId: number) => {
    setDeleteErr(null);
    try {
      await deleteComment(commId);
    } catch {
      setDeleteErr(TypeErrorMessages.delete);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loadingComments && <Loader />}

        {!loadingComments && errorMes === TypeErrorMessages.Wrong && (
          <div className="notification is-danger" data-cy="CommentsError">
            {TypeErrorMessages.Wrong}
          </div>
        )}

        {!loadingComments && errorMes === TypeErrorMessages.noComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            {TypeErrorMessages.noComments}
          </p>
        )}

        {!loadingComments && errorMes === null && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
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

            {deleteErr && (
              <div className="notification is-danger">
                <button
                  onClick={() => setDeleteErr(null)}
                  className="delete"
                ></button>
                {deleteErr}
              </div>
            )}
          </>
        )}

        {showButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => onNewComment()}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && errorMes !== TypeErrorMessages.Wrong && (
        <NewCommentForm
          addNewComment={addNewComment}
          selectedPost={selectedPost}
        />
      )}
    </div>
  );
};
