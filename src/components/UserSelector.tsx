import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { AppContext } from './AppState';
import { UsersList } from './UsersList';

export const UserSelector: React.FC = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { selectedUser } = useContext(AppContext);
  const userSelectorElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOuterClick = (e: MouseEvent) => {
      if (
        !userSelectorElement?.current?.contains(e.target as Node) &&
        isDropDownOpen
      ) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener('click', handleOuterClick);

    return () => {
      document.removeEventListener('click', handleOuterClick);
    };
  }, [isDropDownOpen, userSelectorElement]);

  const handleDropdownClick = useCallback(() => {
    setIsDropDownOpen(prevState => !prevState);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropDownOpen,
      })}
      ref={userSelectorElement}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownClick}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <UsersList setIsDropDownOpen={setIsDropDownOpen} />
      </div>
    </div>
  );
};
