import React, { useCallback, useContext, useState } from 'react';
import { UserListContext } from './listContext';
import { addComments } from './todosApi/api-todos';

export const NewCommentForm: React.FC = () => {
  const [autorNameInput, setAutorNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [commentTextInput, setCommentTextInput] = useState('');
  const [autorNameError, setAutorNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const {
    selectedPostId,
    buttonLoading,
    setButtonLoading,
    setComments,
    setErrorComments,
    setAddComent,
  } = useContext(UserListContext);

  // console.log(autorNameInput, emailInput, commentTextInput);

  const handleInputNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAutorNameInput(event.target.value);
      setAutorNameError(false);
    },
    [],
  );

  const handleInputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailInput(event.target.value);
      setEmailError(false);
    },
    [],
  );

  const handlerTextComment = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentTextInput(event.target.value);
      setBodyError(false);
    },
    [],
  );

  const validation = () => {
    let hasNameError = false;
    let hasEmailError = false;
    let hasBodyError = false;

    if (!autorNameInput.trim()) {
      hasNameError = true;
    }

    if (!emailInput.trim()) {
      hasEmailError = true;
    }

    if (!commentTextInput.trim()) {
      hasBodyError = true;
    }

    setAutorNameError(hasNameError);
    setEmailError(hasEmailError);
    setBodyError(hasBodyError);

    return !hasNameError && !hasEmailError && !hasBodyError;
  };

  const handleReset = () => {
    setCommentTextInput('');
    setEmailInput('');
    setAutorNameInput('');
    setAutorNameError(false);
    setEmailError(false);
    setBodyError(false);
  };

  const handleAddCommentButton = () => {
    validation();
    if (
      autorNameInput.trim() !== '' &&
      emailInput.trim() !== '' &&
      commentTextInput.trim() !== '' &&
      selectedPostId !== null
    ) {
      setButtonLoading(true);

      const newComment = {
        id: 0,
        postId: selectedPostId,
        name: autorNameInput.trim(),
        email: emailInput.trim(),
        body: commentTextInput.trim(),
      };

      addComments(newComment)
        .then(addedComment => {
          setComments(prevComments => [...prevComments, addedComment]);
          setCommentTextInput('');
        })
        .catch(() => {
          setErrorComments(true);
          setAddComent(false);
        })
        .finally(() => {
          setButtonLoading(false);
        });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validation();
    handleAddCommentButton();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={autorNameInput}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={autorNameError ? 'input is-danger' : 'input'}
            onChange={handleInputNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {autorNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {autorNameError && (
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
            value={emailInput}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={emailError ? 'input is-danger' : 'input'}
            onChange={handleInputEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {emailError && (
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
            value={commentTextInput}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={bodyError ? 'textarea is-danger' : 'textarea'}
            onChange={handlerTextComment}
          />
        </div>
        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={
              buttonLoading ? 'button is-link is-loading' : 'button is-link'
            }
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
