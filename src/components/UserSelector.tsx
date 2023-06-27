import React from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useClickOutside } from '../hooks/useClickoutside';

type Props = {
  users: User[] | null,
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  // const [isShowUsers, setIsShowUsers] = useState(false);
  // const isActiveUser = selectedUser.name ===
  // useEffect(() => {
  //   console.log(ref.current);
  // });
  const { domNode, setIsUsersVisible, isUsersVisible } = useClickOutside(false);

  const handleToggleIsVisible = () => {
    setIsUsersVisible((prev) => !prev);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isUsersVisible,
      })}
      ref={domNode}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleIsVisible}
        >
          <span>
            {!selectedUser ? (
              'Choose a user'
            ) : (
              selectedUser.name
            )}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isUsersVisible && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            {users?.map((user: User) => {
              return (
                <a
                  href={`#user-${user.id}`}
                  className={classNames('dropdown-item', {
                    'is-active': selectedUser?.name === user.name,
                  })}
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    handleToggleIsVisible();
                  }}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
