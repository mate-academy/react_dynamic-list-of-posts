import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getPostComments, addComment } from '../../api/comments';

import './NewCommentForm.scss';

export const NewCommentForm = React.memo(
  ({ postId, setComments }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async(event) => {
      event.preventDefault();

      const options = {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          body,
          postId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };

      await addComment(options);
      await getPostComments(postId)
        .then(result => setComments(result));

      setName('');
      setEmail('');
      setBody('');
    };

    const setData = (event) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;

      switch (fieldName) {
        case 'name':
          setName(fieldValue);
          break;

        case 'email':
          setEmail(fieldValue);
          break;

        case 'body':
          setBody(fieldValue);
          break;

        default: throw new Error(
          `NewCommentForm, line 35, unexpected input name - ${fieldName}`,
        );
      }
    };

    return (
      <form
        className="NewCommentForm"
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            value={name}
            onChange={setData}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            value={email}
            onChange={setData}
            required
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            value={body}
            onChange={setData}
            required
          />
        </div>

        <button
          type="submit"
          className="NewCommentForm__submit-button button"
        >
          Add a comment
        </button>
      </form>
    );
  },
);

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};
