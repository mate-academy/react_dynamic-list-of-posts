/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import { useState } from 'react';

type NewCommentFormProps = {
  onNewComment: (name: string, email: string, text: string) => void;
  loadingFormSubmit: boolean;
};

type NewCommentFormState = {
  authorName: string;
  authorEmail: string;
  authorText: string;
  formSubmited: boolean;
};

export const NewCommentForm = ({
  onNewComment,
  loadingFormSubmit,
}: NewCommentFormProps) => {
  const [state, setState] = useState<NewCommentFormState>({
    authorName: '',
    authorEmail: '',
    authorText: '',
    formSubmited: false,
  });

  const handleUpdateState = (stateUpdate: Partial<NewCommentFormState>) => {
    setState(prev => ({ ...prev, ...stateUpdate }));
  };

  const handleFormSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    handleUpdateState({ formSubmited: true });

    if (
      state.authorName.trim() &&
      state.authorEmail.trim() &&
      state.authorText.trim()
    ) {
      onNewComment(state.authorName, state.authorEmail, state.authorText);
      handleUpdateState({ authorText: '', formSubmited: false });
    }
  };

  const handleClearForm = () => {
    handleUpdateState({
      authorName: '',
      authorEmail: '',
      authorText: '',
      formSubmited: false,
    });
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={event => handleFormSubmit(event)}>
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
            className={classNames('input', {
              'is-danger': !state.authorName.trim() && state.formSubmited,
            })}
            value={state.authorName}
            onChange={event =>
              handleUpdateState({ authorName: event.target.value })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!state.authorName.trim() && state.formSubmited && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!state.authorName.trim() && state.formSubmited && (
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
            className={classNames('input', {
              'is-danger': !state.authorEmail.trim() && state.formSubmited,
            })}
            value={state.authorEmail}
            onChange={event =>
              handleUpdateState({ authorEmail: event.target.value })
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!state.authorEmail.trim() && state.formSubmited && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!state.authorEmail.trim() && state.formSubmited && (
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
            className={classNames('textarea', {
              'is-danger': !state.authorText.trim() && state.formSubmited,
            })}
            value={state.authorText}
            onChange={event =>
              handleUpdateState({ authorText: event.target.value })
            }
          />
        </div>

        {!state.authorText.trim() && state.formSubmited && (
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
              'is-loading': loadingFormSubmit,
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
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
