import React, { useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../Api/Api';
import { Comment } from '../types/Comment';

type Props = {
  selectedPostId: number | undefined
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  setComments,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isErrorName, setIsErrorName] = useState<boolean>(false);
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [isErrorText, setIsErrorText] = useState<boolean>(false);

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setIsErrorName(false);
    const newValue: string = event.target.value;

    setName(newValue);
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setIsErrorEmail(false);
    const newValue: string = event.target.value;

    setEmail(newValue);
  };

  const handleChangeText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    setIsErrorText(false);
    const newValue: string = event.target.value;

    setText(newValue);
  };

  const addNewComment = async () => {
    if (!name.trim() || !email.trim() || !text.trim()) {
      return;
    }

    setIsLoading(true);

    const id = selectedPostId as number;

    const newComment = {
      name,
      email,
      body: text,
      postId: id,
    };

    try {
      if (selectedPostId) {
        const addedComment = await addComment(selectedPostId, newComment);

        setComments(
          (currentComments: Comment[]) => [...currentComments, addedComment],
        );
        setText('');
        setIsLoading(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding comment:', error);
    }
  };

  const errorInput = () => {
    if (name.trim().length === 0) {
      setIsErrorName(true);
    }

    if (email.trim().length === 0) {
      setIsErrorEmail(true);
    }

    if (text.trim().length === 0) {
      setIsErrorText(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    errorInput();
    addNewComment();
  };

  const clearAllInput = () => {
    setText('');
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
            className={classNames(
              'input',
              { 'is-danger': isErrorName },
            )}
            value={name}
            onChange={handleChangeName}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isErrorName
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>

        {isErrorName
          && (
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
            value={email}
            onChange={handleChangeEmail}
            className={classNames(
              'input',
              { 'is-danger': isErrorEmail },
            )}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isErrorEmail
            && (
              <span
                className="icon is-small is-right has-text-danger"
                data-cy="ErrorIcon"
              >
                <i className="fas fa-exclamation-triangle" />
              </span>
            )}
        </div>
        {isErrorEmail
          && (
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
              'textarea',
              { 'is-danger': isErrorText },
            )}
            value={text}
            onChange={handleChangeText}
          />
        </div>
        {isErrorText
          && (
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
              {
                'is-loading': isLoading,
              },
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
            onClick={clearAllInput}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
