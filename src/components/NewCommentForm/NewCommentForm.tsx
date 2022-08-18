import {
  Dispatch, FormEvent, SetStateAction, useState,
} from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../types/Comment';
import { addComment } from '../../api/comments';
import { getComments } from '../PostDetails/getComments';

interface Props {
  postId: number;
  setIsLoading: (isLoading: boolean) => void;
  updateComments: Dispatch<SetStateAction<Comment[]>>;
}

export const NewCommentForm = (
  { postId, setIsLoading, updateComments }: Props,
) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    await addComment(postId, name, mail, message);

    getComments(postId, updateComments, setIsLoading);

    setName('');
    setMail('');
    setMessage('');
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
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={mail}
          onChange={({ target }) => setMail(target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        disabled={name.trim().length === 0
          || mail.trim().length === 0
          || message.trim().length === 0}
      >
        Add a comment
      </button>
    </form>
  );
};
