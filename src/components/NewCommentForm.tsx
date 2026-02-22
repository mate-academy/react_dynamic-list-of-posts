import React, { useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import classNames from 'classnames';

interface NewComment {
  name: string;
  email: string;
  body: string;
}

type Props = {
  selectedPostId: number;
  onCommentCreated: (newComment: Comment) => void;
  setErrorComment: (newError: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onCommentCreated,
  setErrorComment,
}: Props) => {
  const [inputsData, setInputsData] = useState({
    name: '',
    email: '',
    body: '',
  });

  const [errorsForm, setErrorsForm] = useState({
    errorName: false,
    errorEmail: false,
    errorBody: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const validationData = (data: NewComment) => {
    const newErrors = {
      errorName: !data.name.trim(),
      errorEmail: !data.email.trim(),
      errorBody: !data.body.trim(),
    };

    setErrorsForm(newErrors);

    return newErrors.errorName || newErrors.errorEmail || newErrors.errorBody;
  };

  const sendData = async (data: NewComment) => {
    if (validationData(data)) {
      return;
    }

    try {
      setIsLoading(true);

      const comment = { ...data, postId: selectedPostId };
      const createdComment = await client.post<Comment>('/comments', comment);

      onCommentCreated(createdComment);

      setInputsData(prev => ({ ...prev, body: '' }));
    } catch (e) {
      setErrorComment('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendData(inputsData);
  };

  const updateStateOfInputs = (
    field: 'name' | 'email' | 'body',
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setInputsData(prev => ({
      ...prev,
      [field]: value,
    }));

    setErrorsForm(prev => ({
      ...prev,
      [`error${field[0].toUpperCase()}${field.slice(1)}`]: false,
    }));
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
            className={classNames('input', errorsForm.errorName && 'is-danger')}
            value={inputsData.name}
            onChange={e => updateStateOfInputs('name', e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorsForm.errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorsForm.errorName && (
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
            className={classNames(
              'input',
              errorsForm.errorEmail && 'is-danger'
            )}
            value={inputsData.email}
            onChange={e => updateStateOfInputs('email', e)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorsForm.errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorsForm.errorEmail && (
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
            className={classNames(
              'input',
              errorsForm.errorBody && 'is-danger'
            )}
            value={inputsData.body}
            onChange={e => updateStateOfInputs('body', e)}
          />
        </div>

        {errorsForm.errorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              isLoading && 'is-loading'
            )}
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
              setInputsData({
                name: '',
                email: '',
                body: '',
              });

              setErrorsForm({
                errorName: false,
                errorEmail: false,
                errorBody: false,
              });
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
