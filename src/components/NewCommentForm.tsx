import React, { useCallback, useContext, useState } from 'react';
import { UserListContext } from './listContext';
import { addComments } from './todosApi/api-todos';

export const NewCommentForm: React.FC = () => {
  const [autorNameInput, setAutorNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [commentTextInput, setCommentTextInput] = useState('');
  const { selectedPostId, buttonLoading, setButtonLoading } =
    useContext(UserListContext);

  // console.log(autorNameInput, emailInput, commentTextInput);

  const handleInputNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAutorNameInput(event.target.value);
    },
    [],
  );

  const handleInputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailInput(event.target.value);
    },
    [],
  );

  const handlerTextComment = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentTextInput(event.target.value);
    },
    [],
  );

  const handleAddCommentButton = () => {
    setButtonLoading(true);
    if (
      autorNameInput.trim() !== '' &&
      emailInput.trim() !== '' &&
      commentTextInput.trim() !== '' &&
      selectedPostId !== null
    ) {
      const newComment = {
        id: 0,
        postId: selectedPostId,
        name: autorNameInput.trim(),
        email: emailInput.trim(),
        body: commentTextInput.trim(),
      };

      addComments([newComment])
        .then(() => {
          setAutorNameInput('');
          setEmailInput('');
          setCommentTextInput('');
        })
        .catch(() => {})
        .finally(() => {
          setButtonLoading(false);
        });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }}
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
            className="input is-danger"
            onChange={handleInputNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Name is required
        </p>
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
            className="input is-danger"
            onChange={handleInputEmail}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Email is required
        </p>
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
            className="textarea is-danger"
            onChange={handlerTextComment}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={
              buttonLoading ? 'button is-link is-loading' : 'button is-link'
            }
            onClick={handleAddCommentButton}
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
  );
};
