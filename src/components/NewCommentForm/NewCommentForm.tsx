import React, { useEffect, useMemo, useState } from 'react';
import './NewCommentForm.scss';
import { postComment } from '../../api/comments';
import { isEmailValid } from '../../validators/emailValidator';

type Props = {
  postId: number;
  changeIsReload: () => void;
};

export const NewCommentForm: React.FC<Props> = React.memo((
  { postId, changeIsReload },
) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isValid, setIsValid] = useState(true);

  const stateReset = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const changeHangler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    callback: (x: string) => void,
  ) => {
    callback(event.target.value);
    setIsValid(true);
  };

  useEffect(() => {
    stateReset();
  }, [postId]);

  const isValidForm = useMemo(() => {
    return (
      name.length > 0
      && isEmailValid.test(email)
      && body.length > 0);
  }, [name, email, body]);

  const toPostComment = () => {
    postComment(postId, name, email, body)
      .then(() => (changeIsReload()));
    stateReset();
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => {
        event.preventDefault();

        if (isValidForm) {
          toPostComment();
        } else {
          setIsValid(false);
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={event => changeHangler(event, setName)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={event => changeHangler(event, setEmail)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input NewCommentForm__input--textarea"
          value={body}
          onChange={event => changeHangler(event, setBody)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>

      {!isValid && (
        <p className="NewCommentForm__warning-message">
          Enter valid data!
        </p>
      )}
    </form>
  );
});
