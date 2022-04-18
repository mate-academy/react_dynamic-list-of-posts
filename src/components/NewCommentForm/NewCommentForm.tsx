import React, { useState, ChangeEvent } from 'react';
import { usePostsContext } from '../../customHooks/usePostsContext';
import './NewCommentForm.scss';

type ChangeEventHTML = HTMLInputElement | HTMLTextAreaElement;

export const NewCommentForm: React.FC = React.memo(() => {
  const { comments, setComments, selectedPostId } = usePostsContext();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');

  const resetForm = () => {
    setUserName('');
    setUserEmail('');
    setUserComment('');
  };

  const handleChange = (event: ChangeEvent<ChangeEventHTML>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'userEmail':
        setUserEmail(value);
        break;
      case 'userComment':
        setUserComment(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      id: new Date().valueOf(),
      postId: selectedPostId,
      body: userComment,
      name: userName,
      email: userEmail,
    };

    setComments([...comments, newComment]);
    resetForm();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleChange}
          placeholder="Your name"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="userEmail"
          value={userEmail}
          onChange={handleChange}
          placeholder="Your email"
          className="NewCommentForm__input"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="userComment"
          value={userComment}
          onChange={handleChange}
          placeholder="Type comment here"
          className="NewCommentForm__input"
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
});
