import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postComment } from '../../api/comments';
import { Input } from './input';
import { TextArea } from './textArea';
import './NewCommentForm.scss';

export const NewCommentForm = ({ postId, addComent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!name || !email.includes('@') || !body) {
      return;
    }

    const comment = {
      postId,
      name,
      email,
      body,
    };

    const response = await postComment(comment);

    addComent(response.data);

    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <Input
          name="name"
          value={name}
          setState={setName}

        />
      </div>

      <div className="form-field">
        <Input
          name="email"
          value={email}
          setState={setEmail}
        />
      </div>

      <div className="form-field">
        <TextArea
          name="body"
          value={body}
          setState={setBody}
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
};

NewCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComent: PropTypes.func.isRequired,
};
