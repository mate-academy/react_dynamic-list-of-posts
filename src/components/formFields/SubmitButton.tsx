import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  isOnSubmitLoading: boolean,
};

export const SubmitButton: FC<Props> = ({ isOnSubmitLoading }) => {
  return (
    <div className="control">
      <button
        type="submit"
        className={classNames(
          'button',
          'is-link',
          { 'is-loading': isOnSubmitLoading },
        )}
      >
        Add
      </button>
    </div>
  );
};
