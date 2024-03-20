import React, { useState } from 'react';
import classNames from 'classnames';
import { addComment } from '../api/api';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  setComments: (c: Comment[]) => void;
  setAddComment: (b: boolean) => void;
  selectedPost: Post;
  setErrorMessageComment: (s: string) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  comments,
  setComments,
  setAddComment,
  selectedPost,
  setErrorMessageComment,
}) => {
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorBody, setErrorBody] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handlerChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorName(false);
    setName(event.target.value);
  };

  const handlerChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorEmail(false);
    setEmail(event.target.value);
  };

  const handlerChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrorBody(false);
    setBody(event.target.value);
  };

  const handlerReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setErrorName(false);
    setErrorEmail(false);
    setErrorBody(false);
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessageComment('');
    setErrorName(!name.trim());
    setErrorEmail(!email.trim());
    setErrorBody(!body.trim());

    if (!!name.trim() && !!email.trim() && !!body.trim()) {
      setLoading(true);

      const newComment = {
        postId: selectedPost?.id,
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      };

      addComment(newComment)
        .then(data => {
          const response = {
            id: data.id,
            postId: data.postId,
            name: data.name,
            email: data.email,
            body: data.body,
          };
          const updatedComments = [...comments, response];

          setComments(updatedComments);
        })
        .catch(() => {
          setErrorMessageComment('Something went wrong');
          setAddComment(false);
        })
        .finally(() => {
          setLoading(false);
          setBody('');
          setErrorName(false);
          setErrorEmail(false);
          setErrorBody(false);
        });
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onReset={handlerReset}
      onSubmit={handlerSubmit}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handlerChangeName}
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', {
              'is-danger': errorName,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {errorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorName && (
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
            value={email}
            onChange={handlerChangeEmail}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', {
              'is-danger': errorEmail,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {errorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errorEmail && (
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
            value={body}
            onChange={handlerChangeText}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': errorBody,
            })}
          />
        </div>
        {errorBody && (
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
              'is-loading': loading,
            })}
            disabled={loading}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
