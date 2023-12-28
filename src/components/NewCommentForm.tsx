import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { FormField } from './FormField';
import { InputType } from '../types/InputType';
import { FormTextArea } from './FormTextArea';
import { CommentsContext } from '../store/CommentsContext';
import { Comment } from '../types/Comment';
import { PostsContext } from '../store/PostsContext';
import { ErrorType } from '../types/ErrorType';
import { ErrorNotification } from './ErrorNotification';

export const NewCommentForm: React.FC = () => {
  const { selectedPost } = useContext(PostsContext);
  const { addComment } = useContext(CommentsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<ErrorType>(ErrorType.none);

  const nameState = useState('');
  const emailState = useState('');
  const bodyState = useState('');
  const nameErrorState = useState<ErrorType>(ErrorType.none);
  const emailErrorState = useState<ErrorType>(ErrorType.none);
  const bodyErrorState = useState<ErrorType>(ErrorType.none);

  const fieldsStates = [
    { fieldState: nameState, errorState: nameErrorState },
    { fieldState: emailState, errorState: emailErrorState },
    { fieldState: bodyState, errorState: bodyErrorState },
  ];

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasSomeError = false;

    fieldsStates.forEach(field => {
      if (!field.fieldState[0].trim()) {
        hasSomeError = true;
        field.errorState[1](ErrorType.requiredField);
      }
    });

    if (hasSomeError || !selectedPost || !addComment) {
      return;
    }

    setIsLoading(true);

    const newComment: Omit<Comment, 'id'> = {
      name: nameState[0].trim(),
      email: emailState[0].trim(),
      body: bodyState[0].trim(),
      postId: selectedPost.id,
    };

    addComment(newComment)
      .then(() => bodyState[1](''))
      .catch(() => setFormError(ErrorType.submitForm))
      .finally(() => setIsLoading(false));
  };

  const handleClearClick = () => {
    fieldsStates.forEach(field => {
      field.fieldState[1]('');
      field.errorState[1](ErrorType.none);
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
      {formError && (
        <ErrorNotification
          error={formError}
          setError={setFormError}
          myStyles={false}
        />
      )}

      <FormField
        name="Name"
        icon="user"
        placeholder="Name Surname"
        state={nameState}
        errorState={nameErrorState}
        required
        disabled={isLoading}
      />

      <FormField
        name="Email"
        type={InputType.Email}
        icon="envelope"
        placeholder="email@test.com"
        state={emailState}
        errorState={emailErrorState}
        required
        disabled={isLoading}
      />

      <FormTextArea
        name="Body"
        placeholder="Type comment here"
        state={bodyState}
        errorState={bodyErrorState}
        required
        disabled={isLoading}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              { 'is-loading': isLoading },
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
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
