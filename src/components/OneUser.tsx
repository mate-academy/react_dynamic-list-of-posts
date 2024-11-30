import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  user: User;
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
  setIsDropDownOpen: (status: boolean) => void;
};

export const OneUser: React.FC<Props> = ({
  user,
  selectedUserId,
  setSelectedUserId,
  setIsDropDownOpen,
}) => {
  const handleUserSelect = () => {
    setSelectedUserId(user.id);
    setIsDropDownOpen(false);
  };

  return (
    <a
      href={`#user-${user.id}`}
      className={cn('dropdown-item', {
        'is-active': selectedUserId === user.id,
      })}
      onClick={handleUserSelect}
    >
      {user.name}
    </a>
  );
};
