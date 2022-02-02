import React, { useState } from 'react';
import './NewCommentForm.scss';

type UpdateComments = () => void;

type Props = {
  postId: number;
  updateComments: UpdateComments;
};

export const NewCommentForm: React.FC<Props> = (props) => {
  const { postId, updateComments } = props;
  const [nameForComment, setNameForComment] = useState<string>('');
  const [emailForComment, setEmailForComment] = useState<string>('');
  const [bodyForComment, setBodyForComment] = useState<string>('');

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameForComment(event.target.value);
  };

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailForComment(event.target.value);
  };

  const handleBodyInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyForComment(event.target.value);
  };

  const postComment = async () => {
    const data = {
      postId,
      name: nameForComment,
      email: emailForComment,
      body: bodyForComment,
    };
    const url = 'https://mate.academy/students-api/comments';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    await postComment();
    setNameForComment('');
    setEmailForComment('');
    setBodyForComment('');
    updateComments();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleAddComment}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={nameForComment}
          onChange={handleNameInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={emailForComment}
          onChange={handleEmailInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyForComment}
          onChange={handleBodyInput}
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
