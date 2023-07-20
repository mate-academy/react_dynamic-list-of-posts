import React, {
  FormEvent,
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';

type Props = {
  handleOnAdd: (newComment: CommentData) => void;
  isNewCommentLoading: boolean;
  postSelected: Post | null;
};

export const NewCommentForm: React.FC<Props> = ({
  handleOnAdd,
  isNewCommentLoading,
  postSelected,
}) => {
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [body, setBody] = useState('');
  const [isBodyError, setIsBodyError] = useState(false);

  const handleReset = () => {
    setIsBodyError(false);
    setIsEmailError(false);
    setIsNameError(false);
    setName('');
    setEmail('');
    setBody('');
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isNameEmpty = name.length === 0;
    const isEmailEmpty = email.length === 0;
    const isBodyEmpty = body.length === 0;

    setIsNameError(isNameEmpty);
    setIsEmailError(isEmailEmpty);
    setIsBodyError(isBodyEmpty);

    if (isNameEmpty || isEmailEmpty || isBodyEmpty) {
      return;
    }

    const newComment: CommentData = {
      name,
      email,
      body,
    };

    handleOnAdd(newComment);
    setBody('');
  };

  useEffect(() => {
    handleReset();
  }, [postSelected]);

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
      <div className="field" data-cy="NameField">
        <InputField
          label="Author Name"
          value={name}
          onChange={setName}
          error={isNameError}
          errorMessage="Name is required"
        />
      </div>

      <div className="field" data-cy="EmailField">
        <InputField
          label="Author Email"
          value={email}
          onChange={setEmail}
          error={isEmailError}
          errorMessage="Email is required"
        />
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
            className={classNames('textarea', {
              'is-danger': isBodyError,
            })}
            value={body}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(
              e.target.value.trimStart(),
            )}
          />
        </div>

        {isBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <Button
            label="Add"
            isLoading={isNewCommentLoading}
            onClick={() => {}}
          />
        </div>
        <div className="control">
          <Button label="Clear" onClick={handleReset} />
        </div>
      </div>
    </form>
  );
};
