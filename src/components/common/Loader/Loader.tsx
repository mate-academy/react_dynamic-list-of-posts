import { useContext } from 'react';
import { StateContext } from '../../../store';
import './Loader.scss';

export const Loader = () => {
  const {
    common: { isLoading },
  } = useContext(StateContext);

  return (
    <>
      {isLoading && (
        <div className="Loader" data-cy="Loader">
          <div className="Loader__content" />
        </div>
      )}
    </>
  );
};
