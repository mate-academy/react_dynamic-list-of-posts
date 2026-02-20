import React, { useState } from 'react';
import { client } from '../utils/fetchClient';

interface NewComment {
  postId: number;
  name: string;
  email: string;
  body: string;
}

type Props = {
  selectedPostId: number;
  onCommentCreated: (comment: NewComment) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  onCommentCreated,
}) => {
  const [inputsData, setInputsData] = useState({
    postId: selectedPostId,
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
      errorName: !data.name,
      errorEmail: !data.email,
      errorBody: !data.body,
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
      const createdComment = await client.post<NewComment>('/comments', data);

      onCommentCreated(createdComment);
    } catch (e) {

    } finally {
      setInputsData(prev => ({ ...prev, body: '' }));

      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendData(inputsData);
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
            className={`input ${errorsForm.errorName && 'is-danger'}`}
            value={inputsData.name}
            onChange={e => {
              setInputsData({ ...inputsData, name: e.target.value });
              setErrorsForm({ ...errorsForm, errorName: false });
            }}
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
            className={`input ${errorsForm.errorEmail && 'is-danger'}`}
            value={inputsData.email}
            onChange={e => {
              setInputsData({ ...inputsData, email: e.target.value });
              setErrorsForm({ ...errorsForm, errorEmail: false });
            }}
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
            className={`input ${errorsForm.errorBody && 'is-danger'}`}
            value={inputsData.body}
            onChange={e => {
              setInputsData({ ...inputsData, body: e.target.value });
              setErrorsForm({ ...errorsForm, errorBody: false });
            }}
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
            className={`button is-link ${isLoading && 'is-loading'}`}
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
                postId: selectedPostId,
                name: '',
                email: '',
                body: '',
              })

              setErrorsForm({
    errorName: false,
    errorEmail: false,
    errorBody: false,
  })
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
