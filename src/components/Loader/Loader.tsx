import React, { useContext } from 'react';
import { TodosContext } from '../../TodoContext/TodoContext';
import './Loader.scss';

export const Loader: React.FC = () => {
  const {
    isLoading,
  } = useContext(TodosContext);

  return (
    isLoading
      ? (
        <div className="Loader" data-cy="Loader">
          <div className="Loader__content" />
        </div>
      )
      : null
  );
};
