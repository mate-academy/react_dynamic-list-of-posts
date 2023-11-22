import React, { FormEvent, useState } from 'react';
import cn from 'classnames';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { addNewComment } from '../utils/helpers';
import { LoadingItems } from '../types/LoadingItems';
import { FormErrorsItems } from '../types/ErrorMessage';

type Props = {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setTempComment: React.Dispatch<React.SetStateAction<Comment | null>>,
  selectedPost: Post | null,
  isLoading: LoadingItems,
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingItems>>,

};

export const NewCommentForm: React.FC<Props> = ({
  setComments,
  setTempComment,
  selectedPost,
  isLoading,
  setIsLoading,
}) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newText, setNewText] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrorsItems []>([]);

  const resetInputs = () => {
    setNewName('');
    setNewEmail('');
    setNewText('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      setIsLoading('Button');
      let isError = false;

      if (selectedPost) {
        if (!newName) {
          setFormErrors(prev => [...prev, 'NameField']);
          isError = true;
        }

        if (!newEmail) {
          setFormErrors(prev => [...prev, 'EmailField']);
          isError = true;
        }

        if (!newText) {
          setFormErrors(prev => [...prev, 'BodyField']);
          isError = true;
        }

        if (isError) {
          return;
        }

        const newComment = {
          postId: selectedPost?.id,
          name: newName.trim(),
          email: newEmail.trim(),
          body: newText.trim(),
        };
        const temporaryComment = {
          ...newComment,
          id: 0,
        };

        setTempComment(temporaryComment);

        const addedComment = await addNewComment(newComment);

        setNewText('');
        setTempComment(null);
        setComments(prevComments => [...prevComments, addedComment]);
      }
    } finally {
      setIsLoading('');
    }
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': formErrors.includes('NameField'),
            })}
            value={newName}
            onChange={event => {
              setNewName(event.target.value);
              setFormErrors(prev => prev.filter(err => err !== 'NameField'));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {formErrors.includes('NameField') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {formErrors.includes('NameField') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}

      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': formErrors.includes('EmailField'),
            })}
            value={newEmail}
            onChange={event => {
              setNewEmail(event.target.value);
              setFormErrors(prev => prev.filter(err => err !== 'EmailField'));
            }}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {formErrors.includes('EmailField') && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}

        </div>

        {formErrors.includes('EmailField') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}

      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': formErrors.includes('BodyField'),
            })}
            value={newText}
            onChange={event => {
              setNewText(event.target.value);
              setFormErrors(prev => prev.filter(err => err !== 'BodyField'));
            }}
          />
        </div>

        {formErrors.includes('BodyField') && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}

      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isLoading === 'Button',
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={resetInputs}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
