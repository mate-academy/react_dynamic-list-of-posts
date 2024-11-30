import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../../../utils/fetchFunctions';
import {
  ActivePostContext,
  CommentListContext,
  ErrorsContext,
} from '../../../utils/Store';
import { ErrorTypes } from '../../../types/ErrorTypes';

enum Keys {
  nameField = 'nameField',
  emailField = 'emailField',
  textArea = 'textArea',
}

export const NewCommentForm: React.FC = () => {
  const [isErrorField, setIsErrorField] = useState({
    nameField: false,
    emailField: false,
    textArea: false,
  });

  const [inputQueries, setInputQueries] = useState({
    nameField: '',
    emailField: '',
    textArea: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const { activePost } = useContext(ActivePostContext);
  const { comments, setComments } = useContext(CommentListContext);
  const { isError, setIsError } = useContext(ErrorsContext);

  const onChangeHandler = (property: Keys, value: string) => {
    if (isErrorField[property]) {
      setIsErrorField({
        ...isErrorField,
        [property]: false,
      });
    }

    setInputQueries({ ...inputQueries, [property]: value });
  };

  function handleClear() {
    setInputQueries({
      nameField: '',
      emailField: '',
      textArea: '',
    });

    setIsErrorField({
      nameField: false,
      emailField: false,
      textArea: false,
    });
  }

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newError = { ...isErrorField };

    Object.values(Keys).forEach(key => {
      if (!inputQueries[key].trim()) {
        newError[key] = true;
      }
    });

    setIsErrorField(newError);

    const error = Object.values(newError).some(v => v);

    if (!error) {
      setIsProcessing(true);

      const newComment = {
        id: 0,
        postId: activePost?.id as number,
        name: inputQueries.nameField,
        email: inputQueries.emailField,
        body: inputQueries.textArea,
      };

      addComment(newComment)
        .then(res => {
          if (isError) {
            setIsError(null);
          }

          setComments([...comments, res]);
          setInputQueries({ ...inputQueries, textArea: '' });
        })
        .catch(() => {
          setIsError(ErrorTypes.Comment);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAdd}>
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
            value={inputQueries.nameField}
            className={classNames('input', {
              'is-danger': isErrorField.nameField,
            })}
            onChange={event =>
              onChangeHandler(Keys.nameField, event.target.value.trimStart())
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorField.nameField && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorField.nameField && (
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
            value={inputQueries.emailField}
            className={classNames('input', {
              'is-danger': isErrorField.emailField,
            })}
            onChange={event =>
              onChangeHandler(Keys.emailField, event.target.value.trimStart())
            }
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorField.emailField && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isErrorField.emailField && (
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
            value={inputQueries.textArea}
            className={classNames('textarea', {
              'is-danger': isErrorField.textArea,
            })}
            onChange={event =>
              onChangeHandler(Keys.textArea, event.target.value.trimStart())
            }
          />
        </div>

        {isErrorField.textArea && (
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
              'is-loading': isProcessing,
            })}
            disabled={isProcessing}
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
