import React, {
  ChangeEvent, FormEvent, memo, useCallback, useState,
} from 'react';
import { createComment } from '../../api/comments';
import { CreateComment } from '../../types/comment';
import './NewCommentForm.scss';

type Change = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
  postId: number;
  onCreate: (newComment: CreateComment) => void,
};

export const NewCommentForm: React.FC<Props> = memo(({ postId, onCreate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && email && body) {
      const newCommnet: CreateComment = {
        name,
        email,
        body,
        postId,
      };

      createComment(newCommnet);

      onCreate(newCommnet);

      setName('');
      setEmail('');
      setBody('');
    }
  }, [name, email, body, postId]);

  const handleChange = useCallback((event: Change) => {
    const { name: eventName, value } = event.target;

    switch (eventName) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'body':
        setBody(value);
        break;

      default:
        break;
    }
  }, []);

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={handleChange}
          required
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
