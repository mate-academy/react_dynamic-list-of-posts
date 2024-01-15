import cn from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import * as service from '../utils/api';
import { Comment } from '../types/Comment';

type Props = {
  setUserComments: Dispatch<SetStateAction<Comment[]>>
  setIsErrorComment: (error: boolean) => void,
  isOpenComment: number,
};

export const NewCommentForm: React.FC<Props> = ({
  setUserComments,
  setIsErrorComment,
  isOpenComment,
}) => {
  const [titleName, setTitleName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isBodyError, setIsBodyError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitleName(event.target.value);
    setIsTitleError(event.target.value.trim() === '');
  };

  const handleChangeEmail = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailError(event.target.value.trim() === '');
  };

  const handleChangeBody = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setIsBodyError(event.target.value.trim() === '');
  };

  const handleResetForm = () => {
    setTitleName('');
    setEmail('');
    setBody('');
    setIsTitleError(false);
    setIsEmailError(false);
    setIsBodyError(false);
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsTitleError(!titleName.trim());
    setIsEmailError(!email.trim());
    setIsBodyError(!body.trim());

    if (titleName.trim() && email.trim() && body.trim()) {
      setIsLoader(true);
      try {
        const newComment = await service.newComment({
          name: titleName,
          email,
          body,
          postId: isOpenComment,
        });

        setUserComments((prev) => [...prev, newComment]);
      } catch {
        setIsErrorComment(true);
      } finally {
        setIsLoader(false);
        handleResetForm();
      }
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmitForm}>
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
            className={cn('input', {
              'is-danger': isTitleError,
            })}
            value={titleName}
            onChange={handleInputChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={cn('icon', 'is-small', 'is-right', {
              'has-text-danger': isTitleError,
            })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        {isTitleError && (
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
            className={cn('input', {
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={handleChangeEmail}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={cn('icon', 'is-small', 'is-right',
              { 'has-text-danger': isEmailError })}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>
        {isEmailError && (
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
            className={cn('textarea', {
              'is-danger': isBodyError,
            })}
            value={body}
            onChange={handleChangeBody}
          />
        </div>

        {isBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isLoader,
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
            onClick={() => handleResetForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
