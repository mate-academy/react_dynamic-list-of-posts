import React, { SyntheticEvent, useCallback, useState } from 'react';
import { addPostCommentById } from '../../api/comments';
import { Loader } from '../Loader';
import './NewCommentForm.scss';

type Props = {
  selectedPostId: number;
  getPostDetails: () => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  selectedPostId,
  getPostDetails,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isUploadComment, setIsUploadComment] = useState(false);

  const catchSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    setIsUploadComment(true);

    const preparedObject = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    await addPostCommentById(preparedObject);
    getPostDetails();
  }, [selectedPostId, name, email, body]);

  return (
    <>
      {!isUploadComment
        ? (
          <form className="NewCommentForm" onSubmit={catchSubmit}>
            <div className="form-field">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="NewCommentForm__input"
                value={name}
                onChange={({ target }) => {
                  setName(target.value);
                }}
                required
              />
            </div>
            <div className="form-field">
              <input
                type="text"
                name="email"
                placeholder="Your email"
                className="NewCommentForm__input"
                value={email}
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
                required
              />
            </div>
            <div className="form-field">
              <textarea
                name="body"
                placeholder="Type comment here"
                className="NewCommentForm__input"
                value={body}
                onChange={({ target }) => {
                  setBody(target.value);
                }}
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
        )
        : (
          <>
            <h2>
              Updating data
            </h2>
            <Loader />
          </>
        )}
    </>
  );
});
