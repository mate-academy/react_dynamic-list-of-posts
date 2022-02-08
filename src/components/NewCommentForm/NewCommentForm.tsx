import React, { useState } from 'react';
import './NewCommentForm.scss';

import { createNewComment } from '../../api/comments';

type Props = {
  selectedPostId: number,
};

export const NewCommentForm: React.FC<Props> = ({ selectedPostId }) => {
  const [commentDetails, setCommentDetails] = useState({} as NewComment);

  const handleInputDetails = (event: FormInput) => {
    const input = event.target;
    const inputValue = event.target.value;
    const newComment = {
      name: '',
      email: '',
      body: '',
      postId: selectedPostId,
    };

    switch (input.name) {
      case 'name': {
        newComment.name = inputValue;
        break;
      }

      case 'email': {
        newComment.email = inputValue;
        break;
      }

      case 'body': {
        newComment.body = inputValue;
        break;
      }

      default: {
        break;
      }
    }

    newComment.postId = selectedPostId;

    setCommentDetails(newComment);
  };

  const createCommentHandler = (event: React.FormEvent) => {
    event.preventDefault();
    createNewComment(commentDetails);
  };

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={handleInputDetails}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={handleInputDetails}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={handleInputDetails}
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(event) => {
          createCommentHandler(event);
        }}
      >
        Add a comment
      </button>
    </form>
  );
};
