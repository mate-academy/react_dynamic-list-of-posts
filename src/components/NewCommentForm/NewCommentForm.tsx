import React, { useState } from 'react';
import './NewCommentForm.scss';

type Props = {
  postId: number,
  onAddComments: (newComment: Partial<Comment>) => void,
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, onAddComments } = props;
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userComment, setUserComment] = useState('');

  const resetFormFields = () => {
    setUserName('');
    setUserEmail('');
    setUserComment('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAddComments({
      name: userName,
      email: userEmail,
      body: userComment,
      postId,
    });

    resetFormFields();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          required
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          required
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
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
