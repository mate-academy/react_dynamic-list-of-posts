import { FC, FormEvent, useState } from 'react';
import { addComment } from '../../api/comments';
import { isEmailValid } from './emailValidator';
import './NewCommentForm.scss';

interface Props {
  postId: number,
  setComment: (comment: Comment) => void;
}

interface Errors {
  name: string,
  email: string,
  body: string
}

interface InputData {
  name: string,
  email: string,
  body: string
}

export const NewCommentForm: FC<Props> = ({ postId, setComment }) => {
  const [dataIn, setDataIn] = useState((): InputData => ({
    name: '',
    email: '',
    body: '',
  }));

  const [errors, setErrors] = useState((): Errors => ({
    name: '',
    email: '',
    body: '',
  }));

  const resetForm = () => {
    setDataIn(state => ({
      ...state,
      name: '',
    }));
    setDataIn(state => ({
      ...state,
      email: '',
    }));
    setDataIn(state => ({
      ...state,
      body: '',
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dataIn.name) {
      setErrors(state => ({
        ...state,
        name: 'Please, write your name',
      }));
    }

    if (!isEmailValid.test(dataIn.email)) {
      setErrors(state => ({
        ...state,
        email: 'Please, write correct email',
      }));
    }

    if (!dataIn.body) {
      setErrors(state => ({
        ...state,
        body: 'Please, write something',
      }));
    }

    if (!dataIn.name || !isEmailValid.test(dataIn.email) || !dataIn.body) {
      return;
    }

    addComment(
      postId,
      dataIn.name,
      dataIn.email,
      dataIn.body,
    ).then(comment => {
      setComment(comment);
      resetForm();
    });
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={dataIn.name}
          onChange={(event) => {
            setDataIn(state => ({
              ...state,
              name: event.target.value,
            }));
            setErrors(state => ({
              ...state,
              name: '',
            }));
          }}
        />
        <p className="NewCommentForm__error">{errors.name}</p>
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={dataIn.email}
          onChange={(event) => {
            setDataIn(state => ({
              ...state,
              email: event.target.value,
            }));
            setErrors(state => ({
              ...state,
              email: '',
            }));
          }}
        />
        <p className="NewCommentForm__error">{errors.email}</p>
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={dataIn.body}
          onChange={(event) => {
            setDataIn(state => ({
              ...state,
              body: event.target.value,
            }));
            setErrors(state => ({
              ...state,
              body: '',
            }));
          }}
        />
        <p className="NewCommentForm__error">{errors.body}</p>
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
