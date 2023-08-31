import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  comments: Comment[],
  currentPost: Post,
  showSpinner: boolean,
  // isNotComments: boolean,
  isErrorComments: boolean,
  openForm: boolean,
  setOpenForm: (value: boolean) => void,
  currentPostId: number,
  setComments: (comments: Comment[]) => void
  setIsErrorComments: (value: boolean) => void,
  hendleDeleteComment: (commentId: number) => void,
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  comments,
  showSpinner,
  // isNotComments,
  isErrorComments,
  openForm,
  setOpenForm,
  currentPostId,
  setComments,
  setIsErrorComments,
  hendleDeleteComment,
}) => {
  const conditionsNot = (
    condition1: boolean, condition2: boolean, condition3: boolean,
  ) => {
    return !condition1 && !condition2 && !condition3;
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost.id}: ${currentPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {currentPost.body}
          </p>
        </div>

        <div className="block">
          {showSpinner && <Loader />}

          {isErrorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !showSpinner && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {conditionsNot(showSpinner, !comments.length, isErrorComments)
            && <p className="title is-4">Comments:</p>}

          {!isErrorComments && comments.map(
            comment => (
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
                    onClick={() => hendleDeleteComment(comment.id)}
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ),
          )}

          {conditionsNot(showSpinner, isErrorComments, openForm) && (
            <button
              onClick={() => setOpenForm(true)}
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
            >
              Write a comment
            </button>
          )}
        </div>

        {openForm && !isErrorComments && (
          <NewCommentForm
            currentPostId={currentPostId}
            setComments={setComments}
            comments={comments}
            setIsErrorComments={setIsErrorComments}
          />
        )}
      </div>
    </div>
  );
};
