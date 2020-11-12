import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCommentForm.scss';
import { v4 as uuidv4 } from 'uuid';
import { addCommentToServer } from '../../api/comments';

export function NewCommentForm({ setOpenComments, openPostId }) {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const addComment = (event) => {
    event.preventDefault();

    setOpenComments((prevComments) => {
      const newComment = {
        name: commentName,
        email: commentEmail,
        body: commentBody,
        postId: openPostId,
      };

      setCommentName('');
      setCommentEmail('');
      setCommentBody('');
      addCommentToServer(newComment);

      return [...prevComments, {
        ...newComment, id: uuidv4(),
      }];
    });
  };

  return (
    <form className="NewCommentForm" onSubmit={addComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={commentName}
          onChange={event => setCommentName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={commentEmail}
          onChange={event => setCommentEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={commentBody}
          onChange={event => setCommentBody(event.target.value)}
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
}

NewCommentForm.propTypes = {
  setOpenComments: PropTypes.func.isRequired,
  openPostId: PropTypes.number,
};

NewCommentForm.defaultProps = {
  openPostId: 0,
};
