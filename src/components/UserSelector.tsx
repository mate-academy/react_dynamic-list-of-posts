import React, {
  useCallback,
  useState,
} from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  activeUser: User | null,
  setActiveUser: (user: User) => void,
  getPostList: (user: User) => void,
  setIsSidebar: (isSidebar: boolean) => void,
};

export const UserSelector: React.FC<Props> = (
  {
    users,
    activeUser,
    setActiveUser,
    getPostList,
    setIsSidebar,
  },
) => {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState<boolean>(
    false,
  );

  // const handleActiveUser = (
  //   event: React.MouseEvent,
  //   user: User,
  // ) => {
  //   event.preventDefault();
  //   setActiveUser(user);
  //   console.log('User clicked: ', user);
  // };
  const handleActiveUser = useCallback(
    (event: React.MouseEvent, user: User) => {
      event.preventDefault();
      setActiveUser(user);
      setIsDropdownDisplayed(!isDropdownDisplayed);
      getPostList(user);
      setIsSidebar(false);
    }, [activeUser, isDropdownDisplayed],
  );

  const handleDropdownDisplay = useCallback(() => {
    setIsDropdownDisplayed(!isDropdownDisplayed);
  }, [isDropdownDisplayed]);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownDisplay}
        >
          <span>
            {(activeUser && activeUser.name) || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownDisplayed && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  className={cn(
                    'dropdown-item',
                    { 'is-active': activeUser && user.id === activeUser.id },
                  )}
                  onClick={(event) => {
                    handleActiveUser(event, user);
                  }}
                >
                  {user.name}
                </a>
              );
            })}
            {/* <a href="#user-1" className="dropdown-item">Leanne Graham</a>
            <a href="#user-2" className="dropdown-item is-active">Ervin Howell</a>
            <a href="#user-3" className="dropdown-item">Clementine Bauch</a>
            <a href="#user-4" className="dropdown-item">Patricia Lebsack</a>
            <a href="#user-5" className="dropdown-item">Chelsey Dietrich</a> */}
          </div>
        </div>
      )}
    </div>
  );
};
