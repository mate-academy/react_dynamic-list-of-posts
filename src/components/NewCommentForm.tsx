import React, { useState } from 'react';

import { postComment } from '../api/data';

type Props = {
  postId: number
  getNewComments: (postId: number) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ postId, getNewComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleInput = (callback: (param: string) => void) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget;

    callback(value.trim());
  };

  const postCommentOnServer = async () => {
    if (name && email && comment) {
      postComment(postId, name, email, comment)
        .then(() => getNewComments(postId));
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => event.preventDefault()}
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
            onChange={handleInput(setName)}
            id="comment-author-name"
            placeholder="Name Surname"
            className="input is-danger"
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
            value={email}
            onChange={handleInput(setEmail)}
            id="comment-author-email"
            placeholder="email@test.com"
            className="input is-danger"
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
            value={comment}
            onChange={handleInput(setComment)}
            placeholder="Type comment here"
            className="textarea is-danger"
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
            className="button is-link"
            onClick={postCommentOnServer}
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
