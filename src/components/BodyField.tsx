import classNames from 'classnames';

interface BodyFieldProps {
  setBody: (body: string) => void;
  isBodyError: boolean;
  body: string;
}

export const BodyField: React.FC<BodyFieldProps> = ({
  setBody,
  isBodyError,
  body,
}) => {
  return (
    <div className="field" data-cy="BodyField">
      <label className="label" htmlFor="comment-body">
        Comment Text
      </label>

      <div className="control">
        <textarea
          value={body}
          id="comment-body"
          name="body"
          placeholder="Type comment here"
          className={classNames('textarea', { 'is-danger': isBodyError })}
          onChange={e => setBody(e.target.value)}
        />
      </div>

      {isBodyError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      )}
    </div>
  );
};
