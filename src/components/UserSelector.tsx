import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[] | null | undefined
  setDropDownOpen: Dispatch<SetStateAction<boolean>>;
  dropDownOpen: boolean;
  setUserSelectedId: Dispatch<SetStateAction<number>>;
  userSelectedId: number;
  setPostSelectedId: Dispatch<SetStateAction<number>>
};

export const UserSelector: React.FC<Props> = ({
  users,
  setDropDownOpen,
  dropDownOpen,
  setUserSelectedId,
  userSelectedId,
  setPostSelectedId,
}) => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const showOptions = () => {
    setDropDownOpen(prevState => !prevState);
  };

  const handleUserKeyPress = useCallback(event => {
    const dropDown = document.getElementById('dropdown-menu');

    if (dropDown && !dropDown.contains(event.target)) {
      setDropDownOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleUserKeyPress);

    return () => {
      window.removeEventListener('click', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div
      data-cy="UserSelector"
      id="dropdown-menu"
      className={classNames('dropdown', {
        'is-active': dropDownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={showOptions}
        >
          {!selectedUser ? <span>Choose a user</span>
            : <span>{selectedUser.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users && (
            users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': userSelectedId === user.id,
                })}
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setUserSelectedId(user.id);
                  setPostSelectedId(0);
                  setDropDownOpen(false);
                }}
              >
                {user.name}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
