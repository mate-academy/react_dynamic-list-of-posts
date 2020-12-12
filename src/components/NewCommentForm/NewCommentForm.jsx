import React, { useState } from 'react';
import './NewCommentForm.scss';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { addComment, getPostComments } from '../../api/comments';

export const NewCommentForm = ({ postId, setComments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body) {
      const option = {
        postId,
        name,
        email,
        body,
      };

      addComment(option);
      getPostComments(postId);
      setName('');
      setEmail('');
      setBody('');
      getPostComments(postId).then(setComments);
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
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className={classNames('NewCommentForm__submit-button button', {
          visible: body,
        })}
      >
        Add a comment
      </button>
    </form>
  );
};

NewCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
};
