import React, { useState } from 'react';
import { addComment, getPostComments } from '../../api/comments';
import { NewComment } from '../../react-app-env';
import './NewCommentForm.scss';

interface Props {
  selectedPostId: number,
  setComments: (comments: NewComment[]) => void;
}

export const NewCommentForm: React.FC<Props> = ({
  selectedPostId, setComments,
}) => {
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentEmail, setNewCommentEmail] = useState('');
  const [newCommentBody, setNewCommentBody] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment: NewComment = {
      postId: selectedPostId,
      name: newCommentName,
      email: newCommentEmail,
      body: newCommentBody,
    };

    await addComment(newComment);
    const updateComments = await getPostComments(selectedPostId);

    setComments(updateComments);

    setNewCommentName('');
    setNewCommentEmail('');
    setNewCommentBody('');
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={newCommentName}
          onChange={(event) => setNewCommentName(event.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={newCommentEmail}
          onChange={(event) => setNewCommentEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={newCommentBody}
          onChange={(event) => setNewCommentBody(event.target.value)}
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
