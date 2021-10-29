import React, { useState } from 'react';
import './NewCommentForm.scss';

interface Props {
  selectedPost: string,
  AddCommentAfterSubmit: (comment: Partial<Comment>) => void,
}

export const NewCommentForm: React.FC<Props> = ({ selectedPost, AddCommentAfterSubmit }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isInputEmpty, setisInputEmpty] = useState(false);

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (name && email && body && selectedPost) {
          const newComment = {
            postId: selectedPost,
            name,
            email,
            body,
          };

          AddCommentAfterSubmit(newComment);

          setisInputEmpty(false);
          setName('');
          setEmail('');
          setBody('');
        } else {
          setisInputEmpty(true);
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(event) => setName(event.target.value)}
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
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(event) => setBody(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
      {isInputEmpty && <span className="error-mesege">All fields must not be empty</span>}
    </form>
  );
};
