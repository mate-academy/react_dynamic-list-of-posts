import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFields } from '../types/FormFields';
import { FieldErrors } from '../types/FieldErrors';

type Props = {
  isFormLoading: boolean;
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formFiedls: FormFields;
  onFieldsChange: React.Dispatch<React.SetStateAction<FormFields>>;
  fieldErrors: FieldErrors;
  onClearForm: (type: 'full' | 'part') => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
};

export const NewCommentForm: React.FC<Props> = ({
  isFormLoading,
  onSubmitForm,
  formFiedls,
  onFieldsChange,
  fieldErrors,
  onClearForm,
  setFieldErrors,
}) => {
  return (
    <form onSubmit={e => onSubmitForm(e)} data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={formFiedls.name}
            onChange={e => {
              onFieldsChange(prev => ({ ...prev, name: e.target.value }));
              setFieldErrors(prev => ({ ...prev, name: false }));
            }}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', fieldErrors.name && 'is-danger')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {fieldErrors.name && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {fieldErrors.name && (
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
            value={formFiedls.email}
            onChange={e => {
              onFieldsChange(prev => ({ ...prev, email: e.target.value }));
              setFieldErrors(prev => ({ ...prev, email: false }));
            }}
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', fieldErrors.email && 'is-danger')}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {fieldErrors.email && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {fieldErrors.email && (
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
            value={formFiedls.body}
            onChange={e => {
              onFieldsChange(prev => ({ ...prev, body: e.target.value }));
              setFieldErrors(prev => ({ ...prev, body: false }));
            }}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', fieldErrors.body && 'is-danger')}
          />
        </div>

        {fieldErrors.body && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button', 'is-link', isFormLoading && 'is-loading')}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            onClick={() => onClearForm('full')}
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  isFormLoading: PropTypes.bool.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  formFiedls: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onFieldsChange: PropTypes.func.isRequired,
  fieldErrors: PropTypes.shape({
    name: PropTypes.bool.isRequired,
    email: PropTypes.bool.isRequired,
    body: PropTypes.bool.isRequired,
  }).isRequired,
  onClearForm: PropTypes.func.isRequired,
  setFieldErrors: PropTypes.func.isRequired,
};
