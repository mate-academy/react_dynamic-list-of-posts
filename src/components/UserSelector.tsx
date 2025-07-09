import { DropdownMenu } from './DropdownMenu';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  handleSelectUser: (user: User) => void;
  users: User[] | [];
  selectedUser: User | null;
  activeDropdownMenu: boolean;
  setActiveDropdownMenu: (val: boolean) => void;
  hasError: boolean;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  handleSelectUser,
  users,
  selectedUser,
  activeDropdownMenu,
  setActiveDropdownMenu,
  hasError,
}) => {
  const handleActiveMenu = () => {
    if (!activeDropdownMenu) {
      setActiveDropdownMenu(true);
    } else {
      setActiveDropdownMenu(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': activeDropdownMenu })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleActiveMenu}
        >
          <span>{`${selectedUser ? selectedUser.name : `Choose a user`}`}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <DropdownMenu
        users={users}
        handleSelectUser={handleSelectUser}
        setActiveDropdownMenu={setActiveDropdownMenu}
        selectedUser={selectedUser}
        hasError={hasError}
        activeDropdownMenu={activeDropdownMenu}
      />
    </div>
  );
};
