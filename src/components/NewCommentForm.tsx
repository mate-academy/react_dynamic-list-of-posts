import React, { useState } from 'react';

export const NewCommentForm: React.FC = () => {
  const addComment = () => {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  return (
    <form data-cy="NewCommentForm" onSubmit={addComment}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className="input is-danger"
            onChange={e => setName(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {!name && (
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
            value={email}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className="input is-danger"
            onChange={e => setEmail(e.target.value)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {!email && (
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
            value={text}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className="textarea is-danger"
            onChange={e => setText(e.target.value)}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link is-loading">
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
