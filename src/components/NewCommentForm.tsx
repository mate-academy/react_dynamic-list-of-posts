import React, { useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

interface NewCommentFormType {
  selectedPost: Post;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setUserComments: Dispatch<SetStateAction<Comment[]>>;
}

enum Inputs {
  Name = 'name',
  Email = 'email',
  Text = 'text',
}

export const NewCommentForm: React.FC<NewCommentFormType> = ({
  selectedPost,
  setIsLoading,
  isLoading,
  setUserComments,
}) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputText, setInputText] = useState('');
  const [isInputNameSent, setIsInputNameSent] = useState(false);
  const [isInputEmailSent, setIsInputEmailSent] = useState(false);
  const [isInputTextSent, setIsInputTextSent] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setIsInputNameSent(true);
    setIsInputEmailSent(true);
    setIsInputTextSent(true);

    try {
      const newComment: Comment = {
        postId: selectedPost.id,
        name: inputName,
        email: inputEmail,
        body: inputText,
      };

      if (
        inputName.trim()
        && inputEmail.trim()
        && inputText.trim()
      ) {
        const response: Comment = await client.post('/comments', newComment);

        newComment.id = response.id;
        setUserComments((prev) => [...prev, newComment]);

        setInputText('');
        setIsInputTextSent(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange
    = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      type: Inputs,
    ) => {
      switch (type) {
        case Inputs.Name:
          setInputName(event.target.value);
          setIsInputNameSent(false);
          break;
        case Inputs.Email:
          setInputEmail(event.target.value);
          setIsInputEmailSent(false);
          break;
        case Inputs.Text:
          setInputText(event.target.value);
          setIsInputTextSent(false);
          break;

        default:
          break;
      }
    };

  const clearForm = () => {
    setInputName('');
    setIsInputNameSent(false);
    setInputEmail('');
    setIsInputEmailSent(false);
    setInputText('');
    setIsInputTextSent(false);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
            className={classNames('input',
              { 'is-danger': !inputName.trim() && isInputNameSent })}
            value={inputName}
            onChange={(event) => handleInputChange(event, Inputs.Name)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {!inputName.trim() && isInputNameSent && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!inputName.trim() && isInputNameSent && (
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
            className={classNames('input',
              { 'is-danger': !inputEmail.trim() && isInputEmailSent })}
            value={inputEmail}
            onChange={(event) => handleInputChange(event, Inputs.Email)}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {!inputEmail.trim() && isInputEmailSent && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {!inputEmail.trim() && isInputEmailSent && (
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
            className={classNames('textarea',
              { 'is-danger': !inputText.trim() && isInputTextSent })}
            value={inputText}
            onChange={(event) => handleInputChange(event, Inputs.Text)}
          />
        </div>

        {!inputText.trim() && isInputTextSent && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
