import cn from 'classnames';
import {
  FC, ChangeEvent, useState, memo,
} from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  onSubmit: (commentData: CommentData) => Promise<boolean>;
};

export const NewCommentForm: FC<Props> = memo(({ onSubmit }) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [commentBodyErrorMessage, setCommentBodyErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChage = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setNameErrorMessage('');
        setAuthorName(value);
        break;

      case 'email':
        setEmailErrorMessage('');
        setAuthorEmail(value);
        break;

      case 'body':
        setCommentBodyErrorMessage('');
        setCommentBody(value);
        break;

      default:
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedAuthorName = authorName.trim();
    const trimedAuthorEmail = authorEmail.trim();
    const trimedCommentBody = commentBody.trim();

    if (!trimedAuthorName || !trimedAuthorEmail || !trimedCommentBody) {
      setNameErrorMessage(trimedAuthorName ? '' : 'Name is required');
      setEmailErrorMessage(trimedAuthorEmail ? '' : 'Email is required');
      setCommentBodyErrorMessage(trimedCommentBody ? '' : 'Enter some text');

      return;
    }

    setIsLoading(true);

    onSubmit({
      name: trimedAuthorName,
      email: trimedAuthorEmail,
      body: trimedCommentBody,
    })
      .then((response) => {
        if (response) {
          setCommentBody('');
        }
      })
      . finally(() => {
        setIsLoading(false);
      });
  };

  const handleReset = () => {
    setAuthorName('');
    setAuthorEmail('');
    setCommentBody('');
    setNameErrorMessage('');
    setEmailErrorMessage('');
    setCommentBodyErrorMessage('');
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
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', { 'is-danger': nameErrorMessage })}
            value={authorName}
            onChange={handleFieldChage}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameErrorMessage && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameErrorMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {nameErrorMessage}
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
            className={cn('input', { 'is-danger': emailErrorMessage })}
            value={authorEmail}
            onChange={handleFieldChage}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailErrorMessage && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailErrorMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {emailErrorMessage}
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
            className={cn('textarea', { 'is-danger': commentBodyErrorMessage })}
            value={commentBody}
            onChange={handleFieldChage}
          />
        </div>

        {commentBodyErrorMessage && (
          <p className="help is-danger" data-cy="ErrorMessage">
            {commentBodyErrorMessage}
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
