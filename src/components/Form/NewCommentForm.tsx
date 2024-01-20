import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { FormInput } from './FormInput';
import { Input } from '../../types/Input';
import { MainContext } from '../MainContext';
import { Error } from '../../types/Message';
import { addComment } from '../../utils/api/comments';

export const NewCommentForm: React.FC = () => {
  const {
    comments,
    setIsReset,
    setIsError,
    currentPost,
    setComments,
    setNotification,
  } = useContext(MainContext);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const postId = currentPost?.id || 0;

  const handleClearForm = () => {
    setIsError(false);
    setIsReset(true);
    setName('');
    setEmail('');
    setBody('');
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsReset(false);

    if (!name || !email || !body) {
      setIsError(true);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    addComment({
      postId,
      name,
      email,
      body,
    })
      .then((resp) => {
        setComments([...comments, resp]);
        setBody('');
      }).catch(() => setNotification(Error.getComments))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form data-cy="NewCommentForm">
      <FormInput
        value={name}
        setValue={setName}
        type={Input.Name}
      />
      <FormInput
        value={email}
        setValue={setEmail}
        type={Input.Email}
      />
      <FormInput
        value={body}
        setValue={setBody}
        type={Input.Body}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link',
              { 'is-loading': isLoading })}
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={() => handleClearForm()}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
