import React, { useCallback, useState } from 'react';
import { addComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { NewComment } from '../../types/NewComment';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
  setComments: (newComments: Comment[] | null) => void;
  comments: Comment[] | null;
};

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId,
  setComments,
  comments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidMessage, setIsValidMessage] = useState(true);

  const handleInput = useCallback(
    (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) => {
      switch (target.name) {
        case 'name':
          if (name !== target.value) {
            setIsValidName(true);
          }

          setName(target.value);
          break;

        case 'body':
          if (body !== target.value) {
            setIsValidMessage(true);
          }

          setBody(target.value);
          break;

        case 'email':
          setEmail(target.value);
          break;

        default:
          break;
      }
    }, [name, email, body],
  );

  const handleSubmit
    = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!name.trim()) {
        setIsValidName(false);

        return;
      }

      if (!body.trim()) {
        setIsValidMessage(false);

        return;
      }

      const newComment: NewComment = {
        postId: selectedPostId,
        name,
        email,
        body,
      };

      const addedComment = await addComment(newComment);
      const newComments
        = comments ? [...comments, addedComment] : [addedComment];

      setComments(newComments);
      setName('');
      setEmail('');
      setBody('');
    }, [selectedPostId, comments, name, body, email]);

  return (
    <form
      className="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="form-field">
        <input
          type="text"
          value={name}
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={({ target }) => handleInput(target)}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          value={email}
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={({ target }) => handleInput(target)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={body}
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={({ target }) => handleInput(target)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
      <div className="NewCommentForm__error">
        {!isValidName && 'Please, enter a name'}
        {!isValidMessage && 'Please, enter a message'}
      </div>
    </form>
  );
};
