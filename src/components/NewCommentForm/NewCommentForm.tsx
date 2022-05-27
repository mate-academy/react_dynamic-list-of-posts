import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

type Props = {
  addNewComment: (obj: Commentary) => void;
  postId: number;
};

export const NewCommentForm: React.FC<Props> = ({ addNewComment, postId }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [newComment, setNewComment] = useState('');

  const addInfo = (event:
  ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    switch (name) {
      case 'name':
        setUserName(value);
        break;

      case 'email':
        setUserEmail(value);
        break;

      case 'body':
        setNewComment(value);
        break;

      default:
        throw new Error('error');
    }
  };

  const postNewComment = async () => {
    const commentForCreate = {
      postId,
      name: userName,
      email: userEmail,
      body: newComment,
    };

    const result = await addComment(commentForCreate);

    addNewComment(result);
  };

  const submitForm = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    postNewComment();
    setUserName('');
    setUserEmail('');
    setNewComment('');
  };

  return (
    <form className="NewCommentForm" onSubmit={submitForm}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={userName}
          onChange={addInfo}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={addInfo}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newComment}
          onChange={addInfo}
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
