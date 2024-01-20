import React, { useContext } from 'react';
import { MainContext } from '../MainContext';

export const AddButton: React.FC = () => {
  const { setIsForm, setIsAddButton } = useContext(MainContext);

  const handleClick = () => {
    setIsForm(true);
    setIsAddButton(false);
  };

  return (
    <button
      data-cy="WriteCommentButton"
      type="button"
      onClick={handleClick}
      className="button is-link"
    >
      Write a comment
    </button>
  );
};
