import { FC, FormEvent, useState } from 'react';
import { addComment } from '../../api/comments';
import { Comment } from '../../types/comment';
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

export const NewCommentForm: FC<Props> = ({ postId, setComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [errors, setErrors] = useState((): Errors => ({
    name: '',
    email: '',
    body: '',
  }));

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setErrors(state => ({
        ...state,
        name: 'Please, give us your name',
      }));
    }

    if (!email) {
      setErrors(state => ({
        ...state,
        email: 'Please, give us your email',
      }));
    }

    if (!body) {
      setErrors(state => ({
        ...state,
        body: 'Please, give us your body',
      }));
    }

    if (!name || !email || !body) {
      return;
    }

    addComment({
      postId,
      name,
      email,
      body,
    }).then(comment => {
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
          value={name}
          onChange={(event) => {
            setName(event.target.value);
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
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
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
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
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
