import React, { useState } from 'react';
import { TypeErrorMessages } from '../types/ErrorMessages';
import { Comment as AppComment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import cn from 'classnames';

interface Props {
  addNewComment: (postId: number, data: CommentData) => Promise<AppComment>;
  selectedPost: Post | null;
}

export const NewCommentForm: React.FC<Props> = ({
  addNewComment,
  selectedPost,
}) => {
  const [name, setName] = useState<string>('');
  const [errName, setErrName] = useState<TypeErrorMessages.name | ''>('');
  const [email, setEmail] = useState<string>('');
  const [errEmail, setErrEmail] = useState<TypeErrorMessages.email | ''>('');
  const [message, setMessage] = useState<string>('');
  const [errMess, setErrMess] = useState<TypeErrorMessages.textarea | ''>('');
  const [addError, setAddError] = useState<TypeErrorMessages | ''>('');
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrName('');
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrEmail('');
    setEmail(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrMess('');
    setMessage(e.target.value);
  };

  const validateForm = () => {
    let valid: boolean = true;

    if (name.trim() === '') {
      setErrName(TypeErrorMessages.name);
      valid = false;
    }

    if (email.trim() === '') {
      setErrEmail(TypeErrorMessages.email);
      valid = false;
    }

    if (message.trim() === '') {
      setErrMess(TypeErrorMessages.textarea);
      valid = false;
    }

    return valid;
  };

  const onClear = () => {
    setErrName('');
    setErrEmail('');
    setErrMess('');
    setName('');
    setEmail('');
    setMessage('');
    setAddError('');
  };

  const createNewComment = (): CommentData => {
    return { name: name, email: email, body: message };
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrName('');
    setErrEmail('');
    setErrMess('');
    setAddError('');

    const isFormValid = validateForm();

    if (!isFormValid || selectedPost === null) {
      return;
    }

    try {
      setLoadingAdd(true);

      await addNewComment(selectedPost.id, createNewComment());

      setMessage('');
    } catch {
      setAddError(TypeErrorMessages.add);
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit} onReset={onClear}>
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
            value={name}
            onChange={handleNameChange}
            className={cn('input', { 'is-danger': errName })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {TypeErrorMessages.name}
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
            value={email}
            onChange={handleEmailChange}
            className={cn('input', { 'is-danger': errEmail })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {TypeErrorMessages.email}
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
            value={message}
            onChange={handleMessageChange}
            className={cn('textarea', { 'is-danger': errMess })}
          />
        </div>

        {errMess && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {TypeErrorMessages.textarea}
          </p>
        )}
      </div>

      {addError && (
        <div className="notification is-danger">
          <button className="delete" onClick={() => setAddError('')}></button>
          {addError}
        </div>
      )}
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': loadingAdd })}
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
