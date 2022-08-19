import { FC, FormEvent, useState } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments';

interface Props {
  postId: number,
  handleUpdate: (bool: boolean) => void;
}

export const NewCommentForm: FC<Props> = ({ postId, handleUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addComment({
      postId,
      name,
      email,
      body,
    }).then(() => handleUpdate(true));

    setName('');
    setEmail('');
    setBody('');
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
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        disabled={!name.trim() || !email.trim() || !body.trim()}
      >
        Add a comment
      </button>
    </form>
  );
};
