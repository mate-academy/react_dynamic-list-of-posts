import { useContext, useEffect } from 'react';

import classNames from 'classnames';

import { PostContext } from '../../context/PostContext';
import { UserItem } from '../UserItem';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    dropdown,
    setDropdown,
  } = useContext(PostContext);

  const onDropdownClick = () => {
    setDropdown(false);
  };

  useEffect(() => {
    if (dropdown) {
      window.addEventListener('click', onDropdownClick);
    }

    return () => {
      window.removeEventListener('click', onDropdownClick);
    };
  }, [dropdown]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdown(true)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};
