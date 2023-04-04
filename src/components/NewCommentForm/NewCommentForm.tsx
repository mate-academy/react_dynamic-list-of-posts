import { FC } from 'react';
import cn from 'classnames';
import { CommentData } from '../../types/Comment';
import { useForm } from '../../hooks/useForm';
import { Field } from './Field/Field';
import { TextArea } from './TextArea/TextArea';

interface Props {
  isLoading: boolean;
  onAddComment: (comment: CommentData) => void;
}

export const NewCommentForm: FC<Props> = (props) => {
  const { onAddComment, isLoading } = props;
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
            className={cn('button is-link', {
              'is-loading': isLoading,
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
