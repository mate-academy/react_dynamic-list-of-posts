import { Error } from '../../types/Error';
import './Errors.scss';

type Props = {
  error: Error;
};

export const Errors: React.FC<Props> = ({ error }) => {
  return (
    <div
      data-cy="PostsLoadingError"
      className={`notification is-danger ${!error.isError && 'hidden'}`}
    >
      {error.message}
      <br />
    </div>
  );
};
