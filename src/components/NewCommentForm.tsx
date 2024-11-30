import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import cn from 'classnames';

import { Comment } from '../types/Comment';
import { addComment } from '../utils/api';

const initialFormData = { name: '', email: '', body: '' };
const initialFromErrors = { name: false, email: false, body: false };

interface Props {
  postId: number;
  updateComments: Dispatch<SetStateAction<Comment[]>>;
}

export const NewCommentForm: FC<Props> = ({ postId, updateComments }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFromErrors);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChangeField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData(prevData => ({ ...prevData, [name]: value.trimStart() }));
  };

  const handleResetForm = () => {
    setFormData(initialFormData);
    setFormErrors(initialFromErrors);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, body } = formData;
    const trimmedData = {
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    setFormErrors({
      name: !trimmedData.name,
      email: !trimmedData.email,
      body: !trimmedData.body,
    });

    if (!trimmedData.name && !trimmedData.email && !trimmedData.body) {
      return;
    }

    setIsLoading(true);

    addComment({
      postId,
      ...trimmedData,
    })
      .then(comment => {
        updateComments(prevComments => [...prevComments, comment]);
        setFormData(prevState => ({ ...prevState, body: '' }));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isError && (
        <div className="notification is-danger" data-cy="AddCommentError">
          Something went wrong!
        </div>
      )}

      <form
        data-cy="NewCommentForm"
        onSubmit={handleFormSubmit}
        onReset={handleResetForm}
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
              value={formData.name}
              onChange={handleChangeField}
              className={cn('input', { 'is-danger': formErrors.name })}
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
              value={formData.email}
              onChange={handleChangeField}
              className={cn('input', { 'is-danger': formErrors.email })}
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
              placeholder="Type comment here"
              value={formData.body}
              onChange={handleChangeField}
              className={cn('textarea', { 'is-danger': formErrors.body })}
            />
          </div>

          {formErrors.body && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={cn('button is-link', { 'is-loading': isLoading })}
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
    </>
  );
};
