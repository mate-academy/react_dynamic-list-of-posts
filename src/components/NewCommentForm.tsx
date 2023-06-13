import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { usePostsContext } from '../Context/PostsContext';

export const NewCommentForm: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [text, setText] = useState('');
  const [isAuthor, setIsAuthor] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isText, setIsText] = useState(true);

  const handleClear = () => {
    setAuthor('');
    setAuthorEmail('');
    setText('');
  };

  const { AddComment, chosenPost, loadAdd } = usePostsContext();

  const handleSubmitAdd = (event: FormEvent) => {
    event.preventDefault();

    setIsAuthor(!!author);
    setIsEmail(!!authorEmail);
    setIsText(!!text);

    if (isAuthor && isEmail && isText) {
      const newCommment = {
        postId: chosenPost,
        name: author,
        email: authorEmail,
        body: text,
      };

      AddComment(newCommment);
    }

    setText('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitAdd}>
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
            className={classNames('input', { 'is-danger': !isAuthor })}
            value={author}
            onChange={(event) => setAuthor(event.target.value.trim())}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!isAuthor && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isAuthor && (
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
            className={classNames('input', { 'is-danger': !isEmail })}
            value={authorEmail}
            onChange={(event) => setAuthorEmail(event.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!isEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!isEmail && (
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
            className={classNames('textarea', { 'is-danger': !isText })}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>

        {!isText && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loadAdd })}

          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
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
