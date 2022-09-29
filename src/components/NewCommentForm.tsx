import React, { useState } from 'react';
import classnames from 'classnames';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null;
  setComments: (comments: Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({ post, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorBody, setErrorBody] = useState(false);
  const [loadComment, setLoadComment] = useState(false);

  const addComment = async (data: CommentData) => {
    if (name === '') {
      setErrorName(true);
    }

    if (email === '') {
      setErrorEmail(true);
    }

    if (body === '') {
      setErrorBody(true);
    }

    if (name === '' || email === '' || body === '') {
      return;
    }

    setLoadComment(true);
    await client.post<Comment>('/comments', {
      postId: post?.id,
      name: data.name,
      email: data.email,
      body: data.body,
    });

    const comments = await client.get<Comment[]>(`/comments?postId=${post?.id}`);

    setComments(comments);
    setLoadComment(false);
    setBody('');
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();
        addComment({ name, email, body });
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
            className={classnames('input', { 'is-danger': errorName })}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setErrorName(false);
            }}
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
            id="comment-author-email"
            placeholder="email@test.com"
            className={classnames('input', { 'is-danger': errorEmail })}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorEmail(false);
            }}
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
            placeholder="Type comment here"
            className={classnames('textarea', { 'is-danger': errorBody })}
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              setErrorBody(false);
            }}
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
            className={classnames(
              'button is-link',
              { 'is-loading': loadComment },
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
            onClick={() => {
              setName('');
              setEmail('');
              setBody('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
