import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { addComment } from '../api/Api';
import { Comment } from '../types/Comment';
import { Context } from './Context/Context';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({ setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { postId } = useContext(Context);

  const submitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsName(!name);
    setIsEmail(!email);
    setIsComment(!body);

    if (!name || !body || !email) {
      return;
    }

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    setIsLoading(true);
    addComment(newComment)
      .then((data) => setComments(current => [...current, data]))
      .catch()
      .finally(() => {
        setIsLoading(false);
        setBody('');
      });
  };

  const handleChange = (
    query: string,
    setQuery: (value: string) => void,
    setIsQuery: (value: boolean) => void,
    isQuery: boolean,
  ) => {
    setQuery(query);

    if (isQuery) {
      setIsQuery(!isQuery);
    }
  };

  const reset = () => {
    setBody('');
    setName('');
    setEmail('');
    setIsName(false);
    setIsEmail(false);
    setIsComment(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={submitData}
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
            className={cn('input', { 'is-danger': isName })}
            value={name}
            onChange={(event) => {
              handleChange(event.target.value, setName, setIsName, isName);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {isName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isName && (
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
            className={cn('input', { 'is-danger': isEmail })}
            value={email}
            onChange={(event) => {
              handleChange(event.target.value, setEmail, setIsEmail, isEmail);
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmail && (
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
            className={cn('input', { 'is-danger': isComment })}
            value={body}
            onChange={(event) => {
              handleChange(
                event.target.value, setBody, setIsComment, isComment,
              );
            }}
          />
        </div>

        {isComment && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', { 'is-loading': isLoading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
