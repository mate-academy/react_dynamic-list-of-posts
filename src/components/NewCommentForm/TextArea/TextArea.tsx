import classNames from 'classnames';
import { ChangeEvent } from 'react';

type Props = {
  value: string,
  label: string,
  errorType: boolean,
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
};

export const TextArea: React.FC<Props> = ({
  value,
  label,
  errorType,
  onChange,
}) => {
  return (
    <div className="field" data-cy="BodyField">
      <label className="label" htmlFor="comment-body">
        {label}
      </label>

      <div className="control">
        <textarea
          id="comment-body"
          name="body"
          value={value}
          placeholder="Type comment here"
          className={classNames('textarea', {
            'is-danger': errorType,
          })}
          onChange={onChange}
        />
      </div>

      {errorType && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      )}
    </div>
  );
};
