import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { addComment } from '../utils/apiHandler';
import { PostsAppContext } from './AppContext';
import { Comment } from '../types/Comment';

type Props = {
  postComments: null | Comment[];
  setPostComments: (v: null | Comment[]) => void;
};

enum InputField {
  name = 'nameField',
  email = 'emailField',
  text = 'textField',
}

export const NewCommentForm: React.FC<Props> = ({
  postComments,
  setPostComments,
}) => {
  const { selectedPost } = useContext(PostsAppContext);

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameFieldWarning = showErrors && !authorName.trim();
  const emailFieldWarning = showErrors && !authorEmail.trim();
  const textFieldWarning = showErrors && !commentText.trim();

  const handleCommentFormInputs = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputField: InputField,
  ) => {
    switch (inputField) {
      case InputField.name:
        setAuthorName(event.currentTarget.value);
        break;
      case InputField.email:
        setAuthorEmail(event.currentTarget.value);
        break;
      case InputField.text:
        setCommentText(event.currentTarget.value);
        break;
    }
  };

  const handleSubmitCommentForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!authorName.trim() || !authorEmail.trim() || !commentText.trim()) {
      setShowErrors(true);
      setIsLoading(false);

      return;
    }

    const newComment = {
      postId: selectedPost?.id,
      name: authorName.trim(),
      email: authorEmail.trim(),
      body: commentText.trim(),
    };

    if (selectedPost) {
      addComment(newComment)
        .then((comment: Comment) => {
          if (postComments) {
            setPostComments([...postComments, comment]);
          } else {
            setPostComments([comment]);
          }

          setCommentText('');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleClearButton = () => {
    setShowErrors(false);
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitCommentForm}>
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
              'is-danger': nameFieldWarning,
            })}
            value={authorName}
            onChange={event => handleCommentFormInputs(event, InputField.name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameFieldWarning && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameFieldWarning && (
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
              'is-danger': emailFieldWarning,
            })}
            value={authorEmail}
            onChange={event => handleCommentFormInputs(event, InputField.email)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailFieldWarning && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailFieldWarning && (
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
              'is-danger': textFieldWarning,
            })}
            value={commentText}
            onChange={event => handleCommentFormInputs(event, InputField.text)}
          />
        </div>

        {textFieldWarning && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
