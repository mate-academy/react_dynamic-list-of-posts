import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addPostComment, getPostComments } from '../../api/comments';
import { NewComment } from '../../react-app-env';

interface Props {
  selectedId: number;
  setComments: (comments: NewComment[]) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  selectedId,
  setComments,
}) => {
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newCommentBody, setNewCommentBady] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const comment: NewComment = {
      postId: selectedId,
      name: newCommentName,
      email: newCommentEmail,
      body: newCommentBody,
    };

    await addPostComment(comment);

    const updateComments = await getPostComments(selectedId);

    setComments(updateComments);
    setNewCommentName('');
    setNewCommentEmail('');
    setNewCommentBady('');
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
          value={newCommentName}
          onChange={event => setNewCommentName(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newCommentEmail}
          onChange={event => setNewCommentEmail(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newCommentBody}
          onChange={event => setNewCommentBady(event.target.value)}
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
};
