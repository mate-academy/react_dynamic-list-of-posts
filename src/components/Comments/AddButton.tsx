import React, { useContext } from 'react';
import classNames from 'classnames';
import { MainContext } from '../MainContext';
import { Error } from '../../types/Message';

export const AddButton: React.FC = () => {
  const {
    isForm,
    setIsForm,
    isAddButton,
    notification,
    setIsAddButton,
  } = useContext(MainContext);

  const handleClick = () => {
    setIsForm(true);
    setIsAddButton(false);
  };

  return (
    <button
      data-cy="WriteCommentButton"
      type="button"
      onClick={handleClick}
      className={classNames('button is-link', {
        'is-hidden': !isAddButton
          || notification === Error.getComments
          || isForm,
      })}
    >
      Write a comment
    </button>
  );
};
