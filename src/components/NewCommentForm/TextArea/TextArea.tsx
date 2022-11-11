import { FC, memo } from 'react';
import classNames from 'classnames';
import { ErrorMessage } from '../ErrorMessage';

type Props = {
  body: string,
  isValidBody: boolean,
  handleBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
};

export const TextArea: FC<Props> = memo(({
  body, isValidBody, handleBodyChange,
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
            { 'is-danger': !isValidBody },
          )}
          value={body}
          onChange={handleBodyChange}
        />
      </div>

      {!isValidBody && (
        <ErrorMessage>
          Enter some text
        </ErrorMessage>
      )}
    </div>
  );
});
