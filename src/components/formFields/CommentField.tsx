import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  isCommentEmptyError: boolean,
  setComment: React.Dispatch<React.SetStateAction<string>>,
  comment: string,
  setIsCommentEmptyError: React.Dispatch<React.SetStateAction<boolean>>,
};

export const CommentField: FC<Props> = ({
  isCommentEmptyError,
  comment,
  setComment,
  setIsCommentEmptyError,
}) => {
  const onCommentChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value);
    setIsCommentEmptyError(false);
  };

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
            { 'is-danger': isCommentEmptyError },
          )}
          value={comment}
          onChange={onCommentChangeHandler}
        />
      </div>

      {isCommentEmptyError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          Enter some text
        </p>
      )}

    </div>
  );
};
