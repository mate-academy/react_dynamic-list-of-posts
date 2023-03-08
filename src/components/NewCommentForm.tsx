import React, { useState } from 'react';
import classNames from 'classnames';

import { Comment } from '../types/Comment';
import { TypeError } from '../types/TypeError';
import { FieldType } from '../types/FieldType';
import { createComment } from '../api/comments';
import { InputField } from './InputField';

type Props = {
  addingComment: (comment: Comment) => Promise<void>,
  postId: number,
  isError: string,
  setIsError: React.Dispatch<React.SetStateAction<string>>,
};

export const NewCommentForm: React.FC<Props> = ({
  addingComment,
  postId,
  isError,
  setIsError,
}) => {
  const [isProcessed, setIsProcessed] = useState(false);
  const [newComment, setNewComment] = useState({
    postId,
    name: '',
    email: '',
    body: '',
  });
  const [isErrorEmptyName, setIsErrorEmptyName] = useState(false);
  const [isErrorEmptyEmail, setIsErrorEmptyEmail] = useState(false);
  const [isErrorEmptyText, setIsErrorEmptyText] = useState(false);

  const addCommentHandler = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsError('');
    if (newComment.name.trim()
      && newComment.email.trim()
      && newComment.body.trim()) {
      setIsProcessed(true);
      createComment(newComment)
        .then((addedComment) => {
          addingComment(addedComment);
          setNewComment({
            ...newComment,
            body: '',
          });
        })
        .catch(() => {
          setIsError(TypeError.AddComment);
        })
        .finally(() => setIsProcessed(false));
    } else {
      if (!newComment.name.trim()) {
        setIsErrorEmptyName(true);
      }

      if (!newComment.email.trim()) {
        setIsErrorEmptyEmail(true);
      }

      if (!newComment.body.trim()) {
        setIsErrorEmptyText(true);
      }
    }
  };

  const clearFormHandler = () => {
    setIsError('');
    setNewComment({
      postId,
      name: '',
      email: '',
      body: '',
    });
    setIsErrorEmptyName(false);
    setIsErrorEmptyEmail(false);
    setIsErrorEmptyText(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={addCommentHandler}
    >
      <InputField
        inputType={FieldType.Name}
        newComment={newComment}
        onChange={setNewComment}
        emptyValueError={isErrorEmptyName}
        setEmptyValueError={setIsErrorEmptyName}
      />
      <InputField
        inputType={FieldType.Email}
        newComment={newComment}
        onChange={setNewComment}
        emptyValueError={isErrorEmptyEmail}
        setEmptyValueError={setIsErrorEmptyEmail}
      />
      <InputField
        inputType={FieldType.Text}
        newComment={newComment}
        onChange={setNewComment}
        emptyValueError={isErrorEmptyText}
        setEmptyValueError={setIsErrorEmptyText}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isProcessed },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearFormHandler}
          >
            Clear
          </button>
        </div>
      </div>

      {isError === TypeError.AddComment && (
        <div className="notification is-danger">
          {TypeError.AddComment}
        </div>
      )}
    </form>
  );
};
