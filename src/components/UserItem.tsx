import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  user: User;
  onSelect: (user: User) => void;
  isActive: boolean;
};

export const UserItem: React.FC<Props> = ({ user, onSelect, isActive }) => {
  const handleClick = () => {
    onSelect(user);
  };

  return (
    <a
      href={`#user-${user.id}`}
      className={cn('dropdown-item', { 'is-active': isActive })}
      onClick={handleClick}
    >
      {user.name}
    </a>
  );
};
