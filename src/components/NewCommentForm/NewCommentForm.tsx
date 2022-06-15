import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/BA';

type Props = {
  postId: number | undefined,
  newListComments: () => void,
};

export const NewCommentForm: React.FC<Props> = ({ postId, newListComments }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameUncorrect, setNameUncorrect] = useState(false);
  const [emailUncorrect, setEmailUncorrect] = useState(false);
  const [bodyEmpty, setBodyEmpty] = useState(false);

  const showError = (changeState: any) => {
    changeState(true);
  };

  const hideError = (changeState: any) => {
    changeState(false);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        e.preventDefault();
        if (!nameUncorrect && !emailUncorrect && !bodyEmpty && name && body && email) {
          addComment('/comments', {
            postId,
            name,
            email,
            body,
          })
            .then(() => newListComments());
        }
      }}
    >
      <div className="form-field">
        {nameUncorrect && <p className="NewCommentForm__input-error">Please input correct name</p>}
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => {
            const { value } = e.target;

            setName(value.trim());
          }}
          onBlur={() => {
            const regex = new RegExp('^[a-zA-Zа-яА-ЯёЁ\'][a-zA-Z-а-яА-ЯёЁ\'][a-zA-Zа-яА-ЯёЁ\']?$');

            if (!regex.test(name)) {
              showError(setNameUncorrect);
            } else {
              hideError(setNameUncorrect);
            }
          }}
        />
      </div>
      <div className="form-field">
        {emailUncorrect && <p className="NewCommentForm__input-error">Please input correct email</p>}
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => {
            const { value } = e.target;

            setEmail(value.trim());
          }}
          onBlur={() => {
            if (!email.includes('@')) {
              showError(setEmailUncorrect);
            } else {
              hideError(setEmailUncorrect);
            }
          }}
        />
      </div>

      <div className="form-field">
        {bodyEmpty && <p className="NewCommentForm__input-error">Please input your comment</p>}
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => {
            const { value } = e.target;

            setBody(value);
          }}
          onBlur={() => {
            if (body.length < 3) {
              showError(setBodyEmpty);
            } else {
              hideError(setBodyEmpty);
            }
          }}
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
