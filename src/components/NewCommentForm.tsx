import React, { useState } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  handleComments: (value: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  post, handleComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [textError, setTextError] = useState(false);

  const buttonClass = (value: boolean) => cn(
    'button',
    'is-link',
    { 'is-loading': value },
  );

  const inputDangerClass = (value: boolean) => cn(
    'input',
    { 'is-danger': value },
  );

  const textDangerClass = (value: boolean) => cn(
    'textarea',
    { 'is-danger': value },
  );

  const addComent = async () => {
    if (name.length === 0) {
      setNameError(true);
    }

    if (email.length === 0) {
      setEmailError(true);
    }

    if (text.length === 0) {
      setTextError(true);
    }

    if (name.length !== 0 && email.length !== 0 && text.length !== 0) {
      setIsLoading(true);
      try {
        const newComment: Comment = {
          postId: +(post.id),
          name,
          email,
          body: text,
          id: 0,
        };

        await client.post('\\comments', newComment);
      } finally {
        try {
          const data = await client.get<Comment[]>(`\\comments?postId=${post?.id}`);

          if (data) {
            handleComments(data);
          }
        } finally {
          setIsLoading(false);
        }

        setText('');
      }
    }
  };

  return (
    <form data-cy="NewCommentForm">
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
            value={name}
            className={inputDangerClass(nameError)}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        ) }

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
            className={inputDangerClass(emailError)}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
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
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={textDangerClass(textError)}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setTextError(false);
            }}
          />
        </div>

        {textError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={buttonClass(isLoading)}
            onClick={(event) => {
              event.preventDefault();
              addComent();
            }}
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
              setEmail('');
              setName('');
              setText('');
              setNameError(false);
              setEmailError(false);
              setTextError(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
