import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { Comment } from '../types/Comment';
import classNames from 'classnames';
import { FormErrorState } from '../types/ErrorState';

type Props = {
  loading: boolean;
  selectedPostId?: number;
  onAddComment: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({
  loading,
  selectedPostId,
  onAddComment,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [error, setError] = useState<FormErrorState>({
    name: false,
    email: false,
    text: false,
  });

  const handleClear = () => {
    setText('');

    setError(prev => ({
      ...prev,
      name: false,
      email: false,
      text: false,
    }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrorState = {
      name: name.trim() === '',
      email: email.trim() === '',
      text: text.trim() === '',
    };

    setError(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    try {
      if (selectedPostId) {
        const newComment: Omit<Comment, 'id'> = {
          postId: selectedPostId,
          name: name,
          email: email,
          body: text,
        };

        await onAddComment(newComment);
        handleClear();
      }
    } catch (err) {
      throw err;
    }
  }

  return (
    <form data-cy="NewCommentForm" onSubmit={e => onSubmit(e)}>
      <FormInput
        label="Name"
        id="comment-author-name"
        name="name"
        type="text"
        placeholder="Name Surname"
        value={name}
        onChange={value => {
          setName(value);
          setError(prev => ({ ...prev, name: false }));
        }}
        error={error.name}
        leftIcon="fa-user"
      />

      <FormInput
        label="Email"
        id="comment-author-email"
        name="email"
        type="email"
        placeholder="email@test.com"
        value={email}
        onChange={value => {
          setEmail(value);
          setError(prev => ({ ...prev, email: false }));
        }}
        error={error.email}
        leftIcon="fa-envelope"
      />

      <FormTextarea
        label="Comment Text"
        id="comment-body"
        name="body"
        data="BodyField"
        placeholder="Type comment here"
        value={text}
        onChange={value => {
          setText(value);
          setError(prev => ({ ...prev, text: false }));
        }}
        error={error.text}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => {
              handleClear();
              setEmail('');
              setName('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
