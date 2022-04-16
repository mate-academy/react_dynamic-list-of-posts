import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import './NewCommentForm.scss';
import { createComment, getPostComments } from '../../api/comments';

type Props = {
  postId: number,
  name: string,
  email: string,
  comment: string,
  onSetName: Dispatch<SetStateAction<string>>,
  onSetEmail: Dispatch<SetStateAction<string>>,
  onSetComment: Dispatch<SetStateAction<string>>,
  onCommentsSet: Dispatch<SetStateAction<Comment[]>>,
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  name,
  email,
  comment,
  onSetName,
  onSetEmail,
  onSetComment,
  onCommentsSet,
}) => {
  const reset = () => {
    onSetName('');
    onSetEmail('');
    onSetComment('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createComment(postId, name, email, comment);
    const updatedCommentsList = await getPostComments(postId);

    onCommentsSet(updatedCommentsList);
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={async (e) => {
        try {
          await handleSubmit(e);
          reset();
        } catch (error) {
          throw new Error('Error happened');
        }
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={name}
          required
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => {
            onSetName(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={email}
          required
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => {
            onSetEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          value={comment}
          required
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => {
            onSetComment(e.target.value);
          }}
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
