import React, { useState } from 'react';
import { postNewComment } from '../api/comments';
import { Comment, NewComment } from '../types/Comment';

type Props = {
  postId: number;
  onCommentsListChange: React.Dispatch<React.SetStateAction<Comment[]>>;
  onErrorSet: (value: boolean) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onCommentsListChange,
  onErrorSet,
}) => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');

  const resetForm = () => {
    setTextInput('');
    setTextError(false);
    setEmailError(false);
    setNameError(false);
    setSubmiting(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameError(!nameInput);
    setEmailError(!emailInput);
    setTextError(!textInput);

    if (!nameInput || !emailInput || !textInput) {
      return;
    }

    setSubmiting(true);

    const newComment: NewComment = {
      postId: postId,
      name: nameInput,
      email: emailInput,
      body: textInput,
    };

    postNewComment(newComment)
      .then(response =>
        onCommentsListChange(prevState => [...prevState, response]),
      )
      .catch(() => onErrorSet(true))
      .finally(() => {
        resetForm();
        // setSubmiting(false);
      });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={nameInput}
            onChange={evemt => setNameInput(evemt.target.value)}
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${nameError && 'is-danger'}`}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            value={emailInput}
            onChange={evemt => setEmailInput(evemt.target.value)}
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${emailError && 'is-danger'}`}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            value={textInput}
            onChange={evemt => setTextInput(evemt.target.value)}
            placeholder="Type comment here"
            className={`textarea ${textError && 'is-danger'}`}
          />
        </div>

        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            {...(submiting && { disabled: true })}
            className={`button is-link ${submiting && 'is-loading'}`}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
