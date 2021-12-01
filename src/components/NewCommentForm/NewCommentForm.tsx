import { useState } from 'react';
import { customAlphabet } from 'nanoid';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import './NewCommentForm.scss';

const nanoid = customAlphabet('1234567890', 10);

type Props = {
  postId: Post['id'];
  addComment: (newComment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = ({ postId, addComment }) => {
  const [name, setName] = useState<Comment['name']>('');
  const [email, setEmail] = useState<Comment['email']>('');
  const [body, setBody] = useState<Comment['body']>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addComment({
      id: Number(nanoid()),
      postId,
      name,
      email,
      body,
    });

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
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => setBody(event.target.value)}
          required
        />
      </div>

      <button type="submit" className="NewCommentForm__submit-button button">
        Add a comment
      </button>
    </form>
  );
};
