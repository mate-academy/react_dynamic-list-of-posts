import {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { IUser } from '../../types/IUser';

interface UserSelectorProps {
  users: IUser[];
  selectedUser: IUser | null;
  handleSelectUser: (user: IUser | null) => void;
}

export const UserSelector: FunctionComponent<UserSelectorProps> = ({
  users,
  selectedUser,
  handleSelectUser,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setExpanded(current => !current);
          }}
        >
          <span>
            {!selectedUser
              ? 'Choose a user'
              : selectedUser.name}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => handleSelectUser(user)}
              className={classNames('dropdown-item', {
                'is-active': user === selectedUser,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
