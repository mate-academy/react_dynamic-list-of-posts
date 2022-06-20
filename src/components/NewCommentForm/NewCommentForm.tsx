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

  const showError = (changeState: React.Dispatch<React.SetStateAction<boolean>>) => {
    changeState(true);
  };

  const hideError = (changeState: React.Dispatch<React.SetStateAction<boolean>>) => {
    changeState(false);
  };

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    dataChange: (n: string) => void,
  ) => {
    const { value } = event.target;

    dataChange(value);
  };

  const submitNewComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nameUncorrect && !emailUncorrect && !bodyEmpty && name && body && email) {
      addComment('/comments', {
        postId,
        name,
        email,
        body,
      })
        .then(() => newListComments());
    }

    setName('');
    setEmail('');
    setBody('');
  };

  const onInputName = () => {
    const regex = new RegExp('^[a-zA-Zа-яА-ЯёЁіІїЇ\']+$');

    if (!regex.test(name)) {
      showError(setNameUncorrect);
    } else {
      hideError(setNameUncorrect);
    }
  };

  const onInputMail = () => {
    return (!email.includes('@'))
      ? showError(setEmailUncorrect)
      : hideError(setEmailUncorrect);
  };

  const onInputText = () => {
    return (body.length < 3)
      ? showError(setBodyEmpty)
      : hideError(setBodyEmpty);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => submitNewComment(e)}
    >
      <div className="form-field">
        {nameUncorrect && <p className="NewCommentForm__input-error">Please input correct name</p>}
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => onChangeInput(e, setName)}
          onBlur={() => onInputName()}
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
          onChange={(e) => onChangeInput(e, setEmail)}
          onBlur={() => onInputMail()}
        />
      </div>

      <div className="form-field">
        {bodyEmpty && <p className="NewCommentForm__input-error">Please input your comment</p>}
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => onChangeInput(e, setBody)}
          onBlur={() => onInputText()}
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
