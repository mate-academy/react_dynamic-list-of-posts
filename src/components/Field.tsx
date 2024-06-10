import classNames from 'classnames';
import { useMemo } from 'react';

export enum CommentFieldEnum {
  NAME = 'NAME',
  EMAIL = 'EMAIL',
  TEXT = 'TEXT',
}

export interface CommentField {
  label: string;
  title: string;
  error: string;
  type: CommentFieldEnum;
  isTextArea?: boolean;
  changeField: (newTitle: string, type: CommentFieldEnum) => void;
}

export const Field: React.FC<CommentField> = ({
  label,
  title,
  error,
  type,
  changeField,
  isTextArea = false,
}) => {
  const placeholder = useMemo(() => {
    switch (type) {
      case CommentFieldEnum.EMAIL: {
        return 'email@test.com';
      }

      case CommentFieldEnum.NAME: {
        return 'Name Surname';
      }

      case CommentFieldEnum.TEXT: {
        return 'Type comment here';
      }
    }
  }, [type]);

  const leftIcon = useMemo(() => {
    switch (type) {
      case CommentFieldEnum.EMAIL: {
        return 'comment-author-email';
      }

      case CommentFieldEnum.NAME: {
        return 'comment-author-name';
      }

      case CommentFieldEnum.TEXT: {
        return '';
      }
    }
  }, [type]);

  const DataCy = useMemo(() => {
    switch (type) {
      case CommentFieldEnum.EMAIL: {
        return 'EmailField';
      }

      case CommentFieldEnum.NAME: {
        return 'NameField';
      }

      case CommentFieldEnum.TEXT: {
        return 'BodyField';
      }
    }
  }, [type]);

  const hasError = error && !title.trim();

  return (
    <div className="field" data-cy={DataCy}>
      <label className="label" htmlFor="comment-author-name">
        {label}
      </label>

      <div
        className={classNames('control', {
          'has-icons-left has-icons-right': !isTextArea,
        })}
      >
        {!isTextArea && (
          <input
            type={type === CommentFieldEnum.EMAIL ? 'email' : 'text'}
            name="name"
            id={leftIcon}
            placeholder={placeholder}
            className={classNames('input', { 'is-danger': hasError })}
            value={title}
            onChange={e => changeField(e.target.value, type)}
          />
        )}

        {isTextArea && (
          <textarea
            id="comment-body"
            name="body"
            placeholder={placeholder}
            className={classNames('textarea', { 'is-danger': hasError })}
            value={title}
            onChange={e => changeField(e.target.value, type)}
          />
        )}

        {!isTextArea && (
          <>
            <span className="icon is-small is-left">
              <i
                className={classNames(
                  'fas',
                  { 'fa-envelope': leftIcon === 'comment-author-email' },
                  { 'fa-user': leftIcon === 'comment-author-name' },
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
        )}
      </div>

      {hasError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {error}
        </p>
      )}
    </div>
  );
};
