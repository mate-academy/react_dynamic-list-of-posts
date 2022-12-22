import {
  FC,
  memo,
} from 'react';

import classNames from 'classnames';
import { ErrorMessage } from '../ErrorMessage';

type Props = {
  body: string;
  isBodyValid: boolean;
  handleBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const BodyField: FC<Props> = memo(({
  body,
  isBodyValid,
  handleBodyChange,
}) => {
  return (
    <div className="field" data-cy="BodyField">
      <label className="label" htmlFor="comment-body">
        Comment Text
      </label>

      <div className="control">
        <textarea
          id="comment-body"
          name="body"
          placeholder="Type comment here"
          className={classNames(
            'textarea',
            { 'is-danger': !isBodyValid },
          )}
          value={body}
          onChange={handleBodyChange}
        />
      </div>

      {!isBodyValid && (
        <ErrorMessage>
          Enter some text!
        </ErrorMessage>
      )}
    </div>
  );
});
