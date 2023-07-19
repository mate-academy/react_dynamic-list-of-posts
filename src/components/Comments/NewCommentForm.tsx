import {
  FC, FormEvent, useState, useEffect,
} from 'react';
import classNames from 'classnames';
import { TextField } from './TextField';
import { CommentData, Field, FieldIcon } from '../../types';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import { useGlobalContext } from '../../hooks/useGlobalContext';

export const NewCommentForm: FC = () => {
  const { resetError } = useGlobalContext();
  const { onAddNewComment, commentIsProcessing } = useCommentsContext();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCommentText, setUserCommentText] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReseted, setIsReseted] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!userName || !userEmail || !userCommentText) {
      return;
    }

    const newComment: CommentData = {
      name: userName,
      email: userEmail,
      body: userCommentText,
    };

    const commentIsCreated = await onAddNewComment(newComment);

    if (commentIsCreated) {
      setUserCommentText('');
    }
  };

  const onReset = () => {
    setIsReseted(true);
    resetError();
  };

  useEffect(() => {
    if (isReseted) {
      setIsReseted(false);
    }
  }, [isReseted]);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <TextField
        field={Field.Name}
        id="comment-author-name"
        label="Author Name"
        type="text"
        name="name"
        placeholder="Name Surname"
        errorMessage="Name is required"
        icon={FieldIcon.NameIcon}
        isErrorIcon
        isSubmitted={isSubmitted}
        isReseted={isReseted}
        setIsSubmitted={setIsSubmitted}
        value={userName}
        onChange={setUserName}
      />

      <TextField
        field={Field.Email}
        id="comment-author-email"
        label="Author Email"
        type="text"
        name="email"
        placeholder="email@test.com"
        errorMessage="Email is required"
        icon={FieldIcon.EmailIcon}
        isErrorIcon
        isSubmitted={isSubmitted}
        isReseted={isReseted}
        setIsSubmitted={setIsSubmitted}
        value={userEmail}
        onChange={setUserEmail}
      />

      <TextField
        field={Field.Body}
        id="comment-body"
        label="Comment Text"
        type="textarea"
        name="body"
        placeholder="Type comment here"
        errorMessage="Enter some text"
        isSubmitted={isSubmitted}
        isReseted={isReseted}
        setIsSubmitted={setIsSubmitted}
        value={userCommentText}
        onChange={setUserCommentText}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': commentIsProcessing,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
