import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  Input,
  HolderMap,
  LabelMap,
  ErrorMap,
} from '../../types/Input';
import { PostsContext } from '../PostsContext';

type Props = {
  setValue: (val: string) => void
  value: string
  type: Input
};

export const FormInput: React.FC<Props> = ({ type, value, setValue }) => {
  const { isError, setIsError, isReset } = useContext(PostsContext);
  const [hasError, setHasError] = useState(false);
  const lowerCaseType = type.toLowerCase();

  useEffect(() => {
    if (value.length) {
      return;
    }

    if (isError && !value.length) {
      setHasError(true);
    }

    if (isReset) {
      setHasError(false);
    }
  }, [isError, isReset, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setIsError(false);
    setHasError(false);
  };

  return (
    <div className="field" data-cy={`${type}Field`}>
      <label
        className="label"
        htmlFor={classNames(
          { 'comment-body': type === Input.Body },
          { 'comment-author-name': type === Input.Name },
          { 'comment-author-email': type === Input.Email },
        )}
      >
        {LabelMap()[type]}
      </label>

      <div className={classNames('control',
        { 'has-icons-left has-icons-right': type !== Input.Body })}
      >
        {type !== Input.Body
          ? (
            <>
              <input
                type="text"
                name={lowerCaseType}
                id={`comment-author-${lowerCaseType}`}
                placeholder={HolderMap()[type]}
                className={classNames('input', { 'is-danger': hasError })}
                value={value}
                onChange={(e) => handleChange(e)}
              />
              <span className="icon is-small is-left">
                <i className={classNames(
                  { 'fas fa-user': type === Input.Name },
                  { 'fas fa-envelope': type === Input.Email },
                )}
                />
              </span>

              {hasError && (
                <span
                  className="icon is-small is-right has-text-danger"
                  data-cy="ErrorIcon"
                >
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </>
          ) : (
            <textarea
              name={lowerCaseType}
              id="comment-body"
              placeholder="Type comment here"
              className={classNames('textarea', { 'is-danger': hasError })}
              value={value}
              onChange={(e) => handleChange(e)}
            />
          )}

      </div>
      {hasError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {ErrorMap()[type]}
        </p>
      )}
    </div>
  );
};
