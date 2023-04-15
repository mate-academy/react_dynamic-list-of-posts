import React, { useState } from 'react';
import classNames from 'classnames';

import { addComment } from '../../api/comment';

import { useDataLoader } from '../../hooks/useDataLoader';
import { TextField } from '../TextField';

import { LoadStage } from '../../types/LoadStage';
import { Comment } from '../../types/Comment';

type Props = {
  postId: number;
  onCommentAdd: (comment: Comment) => void;
};

export const NewCommentForm: React.FC<Props> = React.memo(({
  postId,
  onCommentAdd,
}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const [hasUserNameError, setHasUserNameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasTextError, setHasTextError] = useState(false);

  const [addingStage, loadData] = useDataLoader();

  const handleCommentAdd = async (newComment: Omit<Comment, 'id'>) => (
    loadData(() => addComment(newComment).then(onCommentAdd))
  );

  const handleFormSubmit = (submitEvent: React.SyntheticEvent) => {
    submitEvent.preventDefault();

    setHasUserNameError(!userName.trim());
    setHasEmailError(!email.trim());
    setHasTextError(!text.trim());

    if ([userName, email, text].every(field => field.trim())) {
      setText('');

      handleCommentAdd({
        postId,
        name: userName,
        email,
        body: text,
      });
    }
  };

  const handleFormClear = () => {
    setUserName('');
    setEmail('');
    setText('');

    setHasUserNameError(false);
    setHasEmailError(false);
    setHasTextError(false);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleFormSubmit}
    >
      <TextField
        dataCy="NameField"
        id="comment-author-name"
        label="Author Name"
        name="name"
        placeholder="Name Surname"
        errorMessage="Name is required"
        value={userName}
        onChange={setUserName}
        hasError={hasUserNameError}
        onError={setHasUserNameError}
      >
        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>
      </TextField>

      <TextField
        dataCy="EmailField"
        id="comment-author-email"
        label="Author Email"
        name="email"
        placeholder="email@test.com"
        errorMessage="Email is required"
        value={email}
        onChange={setEmail}
        hasError={hasEmailError}
        onError={setHasEmailError}
      >
        <span className="icon is-small is-left">
          <i className="fas fa-envelope" />
        </span>
      </TextField>

      <TextField
        textArea
        dataCy="BodyField"
        id="comment-body"
        label="Comment Text"
        name="body"
        placeholder="Type comment here"
        errorMessage="Enter some text"
        value={text}
        onChange={setText}
        hasError={hasTextError}
        onError={setHasTextError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames(
              'button',
              'is-link',
              {
                'is-loading': addingStage === LoadStage.Loading,
              },
            )}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleFormClear}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
});
