import { useUsers } from '../context/UsersContext';
import { User } from '../types/User';

type Props = {
  handleClick: (user: User) => void,
};

export const SelectUser: React.FC<Props> = ({ handleClick }) => {
  const users = useUsers();

  return (
    <>
      {users.map(user => (
        <a
          href={`#user-${user.id}`}
          className="dropdown-item"
          key={user.id}
          onClick={() => handleClick(user)}
        >
          {user.name}
        </a>

      ))}
    </>
  );
};
