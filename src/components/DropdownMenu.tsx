import { User } from '../types/User';

interface DropdownMenuProps {
  users: User[] | [];
  handleSelectUser: (user: User) => void;
  setActiveDropdownMenu: (isActive: boolean) => void;
  selectedUser: User | null;
  hasError: boolean;
  activeDropdownMenu: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  users,
  handleSelectUser,
  setActiveDropdownMenu,
  selectedUser,
  hasError,
  activeDropdownMenu,
}) => {
  if (!activeDropdownMenu) {
    return null;
  }

  const handleActiveUser = (user: User) => {
    if (selectedUser === user && !hasError) {
      setActiveDropdownMenu(false);

      return;
    }

    setActiveDropdownMenu(false);
    handleSelectUser(user);
  };

  return (
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {users?.map(user => (
          <a
            key={user.id}
            href={`#user-${user.id}`}
            className="dropdown-item"
            onClick={() => handleActiveUser(user)}
          >
            {user.name}
          </a>
        ))}
      </div>
    </div>
  );
};
