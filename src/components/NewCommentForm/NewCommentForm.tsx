import React, { useCallback, useState } from 'react';
import './NewCommentForm.scss';
import { NewCommentWithoutId } from '../../types';
import { addComment } from '../../api/comments';

interface Props {
  postId: number;
  createComment: (newComment: NewCommentWithoutId) => void;
}

export const NewCommentForm: React.FC<Props> = React.memo(({
  postId, createComment,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const changeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name: eventName, value: eventValue } = e.target;

    switch (eventName) {
      case 'name':
        setName(eventValue);
        break;
      case 'email':
        setEmail(eventValue);
        break;
      case 'body':
        setBody(eventValue);
        break;
      default:
        break;
    }
  }, []);

  const submitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name && email && body) {
      const newComment: NewCommentWithoutId = {
        postId,
        name,
        email,
        body,
      };

      createComment(newComment);
      addComment(newComment);

      reset();
    }
  }, [postId, name, email, body]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitHandler}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          required
          value={name}
          onChange={changeHandler}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          required
          value={email}
          onChange={changeHandler}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={body}
          onChange={changeHandler}
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
