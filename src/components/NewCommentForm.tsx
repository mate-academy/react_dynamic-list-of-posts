import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment, RawComment } from '../types/Comment';
import cn from 'classnames';

interface Props {
  postId: number | null;
  onCommentAdd: React.Dispatch<React.SetStateAction<Comment[]>>;
  onError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  onCommentAdd,
  onError,
}) => {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const addComment = (comment: RawComment) => {
    setLoading(true);

    client
      .post('/comments', comment)
      .then(res => {
        onCommentAdd(cur => {
          if (!cur) {
            return [res as Comment];
          }

          return [...cur, res as Comment];
        });
        setText('');
      })
      .catch(() => onError(true))
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = () => {
    let status = true;

    if (!name.trim()) {
      setNameError(true);
      status = false;
    }

    if (!email.includes('@')) {
      setEmailError(true);
      status = false;
    }

    if (!text.trim()) {
      setTextError(true);
      status = false;
    }

    return status;
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = validate();

    if (res && postId) {
      const comment: RawComment = {
        postId,
        name,
        email,
        body: text,
      };

      addComment(comment);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setText('');
    setNameError(false);
    setEmailError(false);
    setTextError(false);
  };

  const onChangeCreator = (
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return (value: string) => {
      setError(false);
      setValue(value);
    };
  };

  const onNameChange = onChangeCreator(setNameError, setName);
  const onEmailChange = onChangeCreator(setEmailError, setEmail);
  const onTextChange = onChangeCreator(setTextError, setText);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={event => submit(event)}
      onReset={clearForm}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': nameError })}
            value={name}
            onChange={event => onNameChange(event.target.value)}
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', { 'is-danger': emailError })}
            value={email}
            onChange={event => onEmailChange(event.target.value)}
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
            placeholder="Type comment here"
            className={cn('textarea', { 'is-danger': textError })}
            value={text}
            onChange={event => onTextChange(event.target.value)}
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
            className={cn('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
