import classNames from 'classnames';
import React, { useState } from 'react';

interface NewCommentFormProps {
  dataResponce: (data: {
    name: string;
    email: string;
    body: string;
  }) => Promise<boolean>;
}

export const NewCommentForm = ({ dataResponce }: NewCommentFormProps) => {
  const [author, setAuthor] = useState('');
  const [authorDanger, setAuthorDanger] = useState(false);

  const [email, setEmail] = useState('');
  const [emailDanger, setEmailDanger] = useState(false);

  const [text, setText] = useState('');
  const [textDanger, setTextDanger] = useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonLoading(true);

    const normalAuthor = author.trim();
    const normalEmail = email.trim();
    const normalText = text.trim();

    setAuthorDanger(!normalAuthor);
    setEmailDanger(!normalEmail);
    setTextDanger(!normalText);

    if (!normalAuthor || !normalEmail || !normalText) {
      return;
    }

    setButtonLoading(true);

    try {
      const success = await dataResponce({
        name: normalAuthor,
        email: normalEmail,
        body: normalText,
      });

      if (success) {
        setText('');
        setTextDanger(false);
      }
    } finally {
      setButtonLoading(false);
    }
  };

  const reset = () => {
    setText('');
    setAuthor('');
    setEmail('');

    setAuthorDanger(false);
    setEmailDanger(false);
    setTextDanger(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={event => handleSubmit(event)}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={author}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames(`input`, { 'is-danger': authorDanger })}
            onChange={event => setAuthor(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {authorDanger && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {authorDanger && (
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
            value={email}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames(`input`, { 'is-danger': emailDanger })}
            onChange={event => setEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {emailDanger && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailDanger && (
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
            value={text}
            placeholder="Type comment here"
            className={classNames(`textarea`, { 'is-danger': textDanger })}
            onChange={event => setText(event.target.value)}
          />
        </div>
        {textDanger && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(`button is-link`, {
              'is-loading': buttonLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
