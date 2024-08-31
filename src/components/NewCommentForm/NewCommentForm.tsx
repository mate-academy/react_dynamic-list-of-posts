import React, { useState } from 'react';
import { ValidatedInput, ValidatedTextarea } from '../ValidatedInput';
import { useAppContext } from '../../BLoC/App/AppContext';
import classNames from 'classnames';

export const NewCommentForm: React.FC = () => {
  const { leaveComment } = useAppContext();
  const [isCommentPending, setIsCommentPending] = useState(false);

  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [body, setBody] = useState('');
  const [isBodyValid, setIsBodyValid] = useState(true);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsNameValid(name !== '');
    setIsEmailValid(email !== '');
    setIsBodyValid(body !== '');

    if (name && email && body) {
      setIsCommentPending(true);

      try {
        await leaveComment({ name, email, body });

        setBody('');
      } catch {}

      setIsCommentPending(false);
    }
  }

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setName('');
    setIsNameValid(true);

    setEmail('');
    setIsEmailValid(true);

    setBody('');
    setIsBodyValid(true);
  }

  function handleNameChange(newName: string) {
    setName(newName);
    setIsNameValid(true);
  }

  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
    setIsEmailValid(true);
  }

  function handleCommentChange(newComment: string) {
    setBody(newComment);
    setIsBodyValid(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      data-cy="NewCommentForm"
    >
      <ValidatedInput
        value={name}
        onChange={handleNameChange}
        valid={isNameValid}
        data-cy="NameField"
        title="Author Name"
        placeholder="Name Surname"
        errorMessage="Name is required"
        icon="fa-user"
        name="comment-author-name"
      />

      <ValidatedInput
        value={email}
        onChange={handleEmailChange}
        valid={isEmailValid}
        data-cy="EmailField"
        title="Author Email"
        placeholder="email@test.com"
        errorMessage="Email is required"
        icon="fa-envelope"
        name="comment-author-email"
      />

      <ValidatedTextarea
        value={body}
        onChange={handleCommentChange}
        valid={isBodyValid}
        data-cy="BodyField"
        title="Comment Text"
        placeholder="Type comment here"
        errorMessage="Enter some text"
        name="comment-body"
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isCommentPending,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
