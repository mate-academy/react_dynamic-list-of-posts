/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  formName: string;
  setFormName: Dispatch<SetStateAction<string>>;
  setFormEmail: Dispatch<SetStateAction<string>>;
  formEmail: string;
  setFormText: Dispatch<SetStateAction<string>>;
  formText: string;
  selectedPostId: number;
  handleSubmit: (nameSurname, email, text, postId) => void;
  setFormOpened: Dispatch<SetStateAction<boolean>>;
  isLoaderForm: boolean;
  formErrors: { name: boolean; email: boolean; text: boolean };
  setFormErrors: Dispatch<
    SetStateAction<{ name: boolean; email: boolean; text: boolean }>
  >;
};

export const NewCommentForm: React.FC<Props> = ({
  formName,
  setFormName,
  setFormEmail,
  formEmail,
  setFormText,
  formText,
  selectedPostId,
  handleSubmit,
  setFormOpened,
  isLoaderForm,
  formErrors,
  setFormErrors,
}) => {
  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(formName, formEmail, formText, selectedPostId);
        setFormOpened(true);
      }}
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
            value={formName}
            onChange={e => {
              setFormName(e.target.value);
              setFormErrors(prev => ({ ...prev, name: false }));
            }}
            className={classNames('input', {
              'is-danger': formErrors.name === true,
            })}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {formErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.name && (
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
            value={formEmail}
            onChange={e => {
              setFormEmail(e.target.value);
              setFormErrors(prev => ({ ...prev, email: false }));
            }}
            className={classNames('input', {
              'is-danger': formErrors.email === true,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.email && (
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
            value={formText}
            onChange={e => {
              setFormText(e.target.value);
              setFormErrors(prev => ({ ...prev, text: false }));
            }}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': formErrors.text === true,
            })}
          />
        </div>

        {formErrors.text && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoaderForm,
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
            onClick={() => {
              setFormName('');
              setFormEmail('');
              setFormText('');
              setFormErrors({ name: false, email: false, text: false });
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
