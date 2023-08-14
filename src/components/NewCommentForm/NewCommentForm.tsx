import React from 'react';
import classNames from 'classnames';
import { CommentData } from '../../types/Comment';
import { useForm } from '../../useForm/useForm';
import { TextArea } from './TextArea/TextArea';
import { Field } from './Field/Field';

type Props = {
  onAddComment: (comment: CommentData) => void,
  loading: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  onAddComment,
  loading,
}) => {
  const {
    name,
    email,
    commentText,
    nameError,
    emailError,
    commentError,
    notValidEmail,
    handleSubmit,
    handleClear,
    handleEmailChange,
    handleNameChange,
    handleTextChange,
  } = useForm({ onAddComment });

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <Field
        value={name}
        label="Author Name"
        placeHolder="Name Surname"
        errorType={nameError}
        onChange={handleNameChange}
      />

      <Field
        value={email}
        label="Author Email"
        placeHolder="email@test.com"
        errorType={emailError}
        notValid={notValidEmail}
        onChange={handleEmailChange}
      />

      <TextArea
        value={commentText}
        label="Comment Text"
        errorType={commentError}
        onChange={handleTextChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
