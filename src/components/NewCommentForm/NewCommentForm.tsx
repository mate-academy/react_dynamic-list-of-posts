import React, { useState } from 'react';
import { postComment } from '../../api/comments';

import './NewCommentForm.scss';

import { Loader } from '../Loader';

type Props = {
  postId: number,
  fetchComments: () => void,
};

export const NewCommentForm: React.FC<Props> = React.memo(
  ({ postId, fetchComments }) => {
    const [newCommentName, setNewCommentName] = useState('');
    const [newCommentEmail, setNewCommentEmail] = useState('');
    const [newCommentBody, setNewCommentBody] = useState('');
    const [isInputFill, setIsInputFill] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const removeFillError = () => {
      if (isInputFill) {
        setIsInputFill(false);
      }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewCommentName(event.target.value);
      removeFillError();
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewCommentEmail(event.target.value);
      removeFillError();
    };

    const handleBodyChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setNewCommentBody(event.target.value);
      removeFillError();
    };

    const updateComments = async (newComment: PostComment) => {
      await postComment(newComment);
      await fetchComments();
      setLoading(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!newCommentName || !newCommentEmail || !newCommentBody) {
        setIsInputFill(true);
      } else {
        setLoading(true);

        const newComment = {
          postId,
          name: newCommentName,
          email: newCommentEmail,
          body: newCommentBody,
        };

        updateComments(newComment);
        setNewCommentName('');
        setNewCommentEmail('');
        setNewCommentBody('');
      }
    };

    return (
      <form className="NewCommentForm" onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            value={newCommentName}
            type="text"
            name="name"
            placeholder="Your name"
            className="NewCommentForm__input"
            onChange={handleNameChange}
          />
        </div>

        <div className="form-field">
          <input
            value={newCommentEmail}
            type="text"
            name="email"
            placeholder="Your email"
            className="NewCommentForm__input"
            onChange={handleEmailChange}
          />
        </div>

        <div className="form-field">
          <textarea
            value={newCommentBody}
            name="body"
            placeholder="Type comment here"
            className="NewCommentForm__input"
            onChange={handleBodyChange}
          />
        </div>

        <button
          type="submit"
          className="NewCommentForm__submit-button button"
        >
          Add a comment
        </button>
        {isLoading && <Loader />}
        {isInputFill && <h3>Fill all fields</h3>}
      </form>
    );
  },
);
