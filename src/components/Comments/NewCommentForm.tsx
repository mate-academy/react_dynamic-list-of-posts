import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useState,
} from 'react';
import cn from 'classnames';
import { useCreateComment } from '../../hooks/useCreateComment';
import { Comment } from '../../types/Comment';

type Props = {
  postId: number;
};

export const NewCommentForm: FC<Props> = ({ postId }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isTextError, setIsTextError] = useState<boolean>(false);
  const { mutateAsync, isLoading } = useCreateComment();

  const isAllFilled = name && email && text;
  const isOneFilled = name || email || text;

  const onReset = useCallback(() => {
    setName('');
    setIsNameError(false);
    setEmail('');
    setIsEmailError(false);
    setText('');
    setIsTextError(false);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAllFilled) {
      setIsNameError(Boolean(!name));
      setIsEmailError(Boolean(!email));
      setIsTextError(Boolean(!text));

      return;
    }

    const newComment: Omit<Comment, 'id'> = {
      postId,
      name,
      email,
      body: text,
    };

    try {
      await mutateAsync(newComment);
    } catch {
      return;
    }

    setText('');
    setIsNameError(false);
    setIsEmailError(false);
    setIsTextError(false);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNameError(false);
    setName(e.target.value);
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmailError(false);
    setEmail(e.target.value);
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsTextError(false);
    setText(e.target.value);
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={onSubmit}>
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
              'is-danger': isNameError,
            })}
            value={name}
            onChange={onNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {isNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isNameError && (
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
              'is-danger': isEmailError,
            })}
            value={email}
            onChange={onEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {isEmailError && (
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
              'is-danger': isTextError,
            })}
            value={text}
            onChange={onTextChange}
          />
        </div>

        {isTextError && (
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
              'is-loading': isLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {isOneFilled && (
            /* eslint-disable-next-line react/button-has-type */
            <button
              type="reset"
              className="button is-link is-light"
              onClick={onReset}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
