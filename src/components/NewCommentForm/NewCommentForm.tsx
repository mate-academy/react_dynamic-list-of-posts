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
  const [userError, setUserError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);

  const addInfo = (event:
  ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    switch (name) {
      case 'name':
        setUserName(value);
        setUserError(null);
        break;

      case 'email':
        setUserEmail(value);
        setEmailError(null);
        break;

      case 'body':
        setNewComment(value);
        setCommentError(null);
        break;

      default:
        throw new Error('error');
    }
  };

  const validate = () => {
    if (!userName.trim()) {
      setUserError('Please enter your name');

      return false;
    }

    if (!userEmail.trim()) {
      setEmailError('Please enter your email');

      return false;
    }

    if (!newComment.trim()) {
      setCommentError('Please enter your comment');

      return false;
    }

    return true;
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

    if (validate()) {
      postNewComment();
      setUserName('');
      setUserEmail('');
      setNewComment('');
      setUserError(null);
      setEmailError(null);
      setCommentError(null);
    }
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
      {userError && <p className="Form__error">{userError}</p>}

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={userEmail}
          onChange={addInfo}
          required
        />
      </div>
      {emailError && <p className="Form__error">{emailError}</p>}

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newComment}
          onChange={addInfo}
        />
      </div>
      {commentError && <p className="Form__error">{commentError}</p>}

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
