import React, { useState } from 'react';
import './NewCommentForm.scss';

interface Props {
  selectedPostId: number;
  onAdd: (newComment: Partial<Comment>) => void;
}

export const NewCommentForm: React.FC<Props> = (props) => {
  const { selectedPostId, onAdd } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;

      case 'email':
        setEmail(target.value);
        break;

      case 'body':
        setBody(target.value);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newComment = {
      name,
      email,
      body,
      postId: selectedPostId,
    };

    onAdd(newComment);
    reset();
  };

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
          onChange={handleInput}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={handleInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={handleInput}
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
