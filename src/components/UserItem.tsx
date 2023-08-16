import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  user: User;
  selectUserFunction: (user: User) => void;
  selectedUser: User | null;
};

export const UserItem: React.FC<Props> = ({
  user,
  selectUserFunction,
  selectedUser,
}) => {
  const selectUserHandler = () => selectUserFunction(user);

  return (
    <a
      key={user.id}
      href={`#user-${user.id}`}
      className={classNames('dropdown-item', {
        'is-active': user.id === selectedUser?.id,
      })}
      onClick={selectUserHandler}
    >
      {user.name}
    </a>
  );
};
