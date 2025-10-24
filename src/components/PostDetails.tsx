/* eslint-disable @typescript-eslint/indent */
import React, { Dispatch, SetStateAction } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  isLoadingComment: boolean;
  isErrorComment: boolean;
  selectedPostComments: Comment[] | null;
  selectedUserPosts: Post[] | null;
  selectedPostId: number;
  formOpened: boolean;
  setFormOpened: Dispatch<SetStateAction<boolean>>;
  formName: string;
  setFormName: Dispatch<SetStateAction<string>>;
  setFormEmail: Dispatch<SetStateAction<string>>;
  formEmail: string;
  setFormText: Dispatch<SetStateAction<string>>;
  formText: string;
  handleSubmit: (nameSurname, email, text, postId) => void;
  isLoadingForm: boolean;
  formErrors: { name: boolean; email: boolean; text: boolean };
  setFormErrors: Dispatch<
    SetStateAction<{ name: boolean; email: boolean; text: boolean }>
  >;
  handleDelete: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedUserPosts,
  isLoadingComment,
  isErrorComment,
  selectedPostComments,
  selectedPostId,
  formOpened,
  setFormOpened,
  formName,
  setFormName,
  setFormEmail,
  formEmail,
  setFormText,
  formText,
  handleSubmit,
  isLoadingForm,
  formErrors,
  setFormErrors,
  handleDelete,
}) => {
  const postComment = selectedUserPosts?.find(
    post => post.id === selectedPostId,
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postComment?.id}: ${postComment?.title}`}
          </h2>

          <p data-cy="PostBody">{postComment?.body}</p>
        </div>

        <div className="block">
          {isLoadingComment && <Loader />}

          {isErrorComment && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {selectedPostComments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoadingComment && selectedPostComments?.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}

          {selectedPostComments?.map(comment => {
            return (
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
                    onClick={e => {
                      e.preventDefault();
                      handleDelete(comment.id);
                    }}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            );
          })}

          {!formOpened &&
            !isLoadingComment &&
            selectedPostComments?.length >= 0 && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setFormOpened(true)}
              >
                Write a comment
              </button>
            )}
        </div>

        {formOpened && (
          <NewCommentForm
            selectedPostId={selectedPostId}
            setFormText={setFormText}
            formText={formText}
            setFormEmail={setFormEmail}
            formEmail={formEmail}
            setFormName={setFormName}
            formName={formName}
            handleSubmit={handleSubmit}
            setFormOpened={setFormOpened}
            isLoadingForm={isLoadingForm}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
          />
        )}
      </div>
    </div>
  );
};
