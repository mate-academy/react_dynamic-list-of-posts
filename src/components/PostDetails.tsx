import React from 'react';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Errors } from '../types/Errors';
import { NewCommentForm } from './NewCommentForm';
import { deleteComments, getComments } from '../api/apiActions';

type Props = {
  isLoadingComments: boolean,
  comments: Comment[] | null,
  selectedPost: Post | null,
  ErrorMessage: Errors,
  isFormVisible: boolean,
  toggleCommentForm: () => void,
  extendComments: (commentToPost: Comment) => void,
  deleteCommentFromState: (commentId: number) => void,
  handleSetComments: (comments: Comment[]) => void,
};

export const PostDetails: React.FC<Props> = ({
  isLoadingComments,
  comments,
  selectedPost,
  ErrorMessage,
  isFormVisible,
  toggleCommentForm,
  extendComments,
  deleteCommentFromState,
  handleSetComments,
}) => {
  const deleteComment = (commentId: number) => {
    if (selectedPost) {
      deleteCommentFromState(commentId);
      deleteComments(commentId)
        .then(() => {
          getComments(selectedPost.id)
            .then(commentsFromServer => {
              handleSetComments(commentsFromServer);
            });
        });
    }
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

          {ErrorMessage === Errors.CommentApi && (
            <div className="notification is-danger" data-cy="CommentsError">
              {Errors.CommentApi}
            </div>
          )}

          {!comments?.length
            && !isLoadingComments
            && !ErrorMessage.length
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}
          <p className="title is-4">Comments:</p>
          {comments?.map(comment => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
            >
              <div className="message-header">
                <a
                  href={`mailto:${comment.email}`}
                  data-cy="CommentAuthor"
                >
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
          {!isFormVisible
            && !isLoadingComments
            && !ErrorMessage.length
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={toggleCommentForm}
              >
                Write a comment
              </button>
            )}

        </div>
        {isFormVisible && (
          <NewCommentForm
            selectedPost={selectedPost}
            extendComments={extendComments}
          />
        )}
      </div>
    </div>
  );
};
