import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalPostsProvider';
import { User } from '../types/User';
import classNames from 'classnames';

export const UserSelector: React.FC = () => {
  const { users, isUserSelectOpen, user } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleOpenModal = () => {
    dispatch({ type: 'isUserSelectOpen' });
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      dispatch({ type: 'isUserSelectOpen', isUserSelectOpen: false });
    }, 150);
  };

  const handleChooseUser = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    person: User
  ) => {
    event.preventDefault();

    dispatch({ type: 'chooseUser', user: person });
    dispatch({ type: 'isOpenPostBody', isOpenPostBody: false });
    dispatch({ type: 'isOpenNewCommentForm', isOpenNewCommentForm: false });
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isUserSelectOpen }
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenModal}
          onBlur={handleCloseModal}
        >
          <span>{user ? `${user.name}` : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>


        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(person => (
              <a
                key={person.id}
                href={`#user-${person.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': person.id === user?.id }
                )}
                onClick={(e) => handleChooseUser(e, person)}
              >
                {person.name}
              </a>
            ))}
          </div>
        </div>

    </div>
  );
};
