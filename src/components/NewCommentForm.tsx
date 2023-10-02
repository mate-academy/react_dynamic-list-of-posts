/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useState } from 'react';
import { postCommentData } from '../api/posts';
import { Comment } from '../types/Comment';

interface Props {
  postId: number,
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>,
}

export const NewCommentForm: React.FC<Props> = ({
  postId,
  setPostComments = () => {},
  setErrorMessage = () => {},
}) => {
  const [nameValue, setNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [commentTextValue, setCommentTextValue] = useState<string>('');

  const [errorNameValue, setErrorNameValue] = useState<boolean>(false);
  const [errorEmailValue, setErrorEmailValue] = useState<boolean>(false);
  const [errorCommentTextValue, setErrorCommentTextValue] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
    setErrorNameValue(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
    setErrorEmailValue(false);
  };

  const handleCommentTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentTextValue(event.target.value);
    setErrorCommentTextValue(false);
  };

  const resetFormClear = () => {
    setNameValue('');
    setEmailValue('');
    setCommentTextValue('');

    setErrorNameValue(false);
    setErrorEmailValue(false);
    setErrorCommentTextValue(false);
  };

  const resetFormAdd = () => {
    setNameValue('');
    setEmailValue('');

    setErrorNameValue(false);
    setErrorEmailValue(false);
  };

  const addNewComment = async () => {
    setLoader(true);

    try {
      const newComment = {
        postId,
        name: nameValue.trim(),
        email: emailValue.trim(),
        body: commentTextValue.trim(),
      };

      const serverComment = await postCommentData(newComment);

      setPostComments(prevComments => [...prevComments, serverComment]);

      resetFormAdd();
    } catch {
      setErrorMessage(true);
    } finally {
      setLoader(false);
    }
  };

  const handleAddComment = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!nameValue.trim()) {
      setErrorNameValue(true);
    }

    if (!emailValue.trim()) {
      setErrorEmailValue(true);
    }

    if (!commentTextValue.trim()) {
      setErrorCommentTextValue(true);
    }

    if (errorNameValue || errorEmailValue || errorCommentTextValue) {
      return;
    }

    addNewComment();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleAddComment}>
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
              'is-danger': errorNameValue,
            })}
            value={nameValue}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {
            errorNameValue && (
              <>
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger" data-cy="ErrorMessage">
                  Name is required
                </p>
              </>
            )
          }

        </div>
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
              'is-danger': errorEmailValue,
            })}
            value={emailValue}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {
            errorEmailValue && (
              <>
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <p className="help is-danger" data-cy="ErrorMessage">
                  Email is required
                </p>
              </>
            )
          }
        </div>
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
            className={classNames('input', {
              'is-danger': errorCommentTextValue,
            })}
            value={commentTextValue}
            onChange={handleCommentTextChange}
          />
        </div>

        {
          errorCommentTextValue && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Enter some text
            </p>
          )
        }
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': loader,
            })}
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
