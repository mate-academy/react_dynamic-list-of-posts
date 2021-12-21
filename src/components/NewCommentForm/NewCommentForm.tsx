import React, { useState } from 'react';
import './NewCommentForm.scss';
// import { useState } from 'react';
import { add } from '../../api/api';

type Props = {
  // callback: (postId:number, name:string, email:string, body:string) => void,
  selectedId:number,
  id:number,
};

export const NewCommentForm: React.FC<Props> = ({ selectedId, id }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const addPost = () => {
    return add('/comments', {
      id,
      postId: selectedId,
      name,
      email,
      body,
    });
  };

  return (
    <form className="NewCommentForm">
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
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
          className="NewCommentForm__input"
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Type comment here"
          className="NewCommentForm__input"
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
        onClick={(event) => {
          event.preventDefault();
          addPost();
          setBody('');
          setName('');
          setEmail('');
        }}
      >
        Add a comment
      </button>
    </form>
  );
};
