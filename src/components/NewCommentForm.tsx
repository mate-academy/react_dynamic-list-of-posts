import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  handleAddingComment: (
    commentName: string,
    commentEmail: string,
    commentBody: string,
  ) => void;
  isLoadingButton: boolean,
};

export const NewCommentForm: React.FC<Props> = ({
  handleAddingComment,
  isLoadingButton,
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorBody, setErrorBody] = useState(false);

  const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement>, name: string) => {
    // eslint-disable-next-line default-case
    switch (name) {
      case 'name':
        setCommentName(event.target.value);
        setErrorName(false);

        return;
      case 'email':
        setCommentEmail(event.target.value);
        setErrorEmail(false);

        return;
      case 'body':
        setCommentBody(event.target.value);
        setErrorBody(false);
    }
  };

  const validationForm = (data: string) => {
    return data.trim().length === 0;
  };

  const handlerOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasNameError = validationForm(commentName);
    const hasEmailError = validationForm(commentEmail);
    const hasBodyError = validationForm(commentBody);

    setErrorName(hasNameError);
    setErrorEmail(hasEmailError);
    setErrorBody(hasBodyError);

    if (!hasNameError && !hasEmailError && !hasBodyError) {
      handleAddingComment(commentName, commentEmail, commentBody);
      setCommentBody('');
    }
  };

  const handlerClearForm = () => {
    setCommentBody('');
    setCommentEmail('');
    setCommentName('');
    setErrorName(false);
    setErrorEmail(false);
    setErrorBody(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handlerOnSubmit}
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
            className={classNames('input',
              { 'is-danger': errorName })}
            value={commentName}
            onChange={(event) => handlerOnChange(event, event.target.name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input',
              { 'is-danger': errorEmail })}
            value={commentEmail}
            onChange={(event) => handlerOnChange(event, event.target.name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            className={classNames('textarea',
              { 'is-danger': errorBody })}
            value={commentBody}
            onChange={(event) => handlerOnChange(event, event.target.name)}
          />
        </div>

        {errorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': isLoadingButton })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handlerClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
