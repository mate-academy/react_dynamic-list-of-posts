import { ChangeEvent, FC } from 'react';
import cn from 'classnames';

interface Props {
  value: string,
  label: string,
  errorType: boolean,
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: FC<Props> = (props) => {
  const {
    value,
    label,
    errorType,
    onChange,
  } = props;

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
          className={cn('textarea', {
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
