import classNames from 'classnames';
import { User } from '../../types/User';

type Props = {
  user: User;
  selectedId: number | null;
  selectUserHandler: (
    e: React.MouseEvent<HTMLAnchorElement>,
    user: User
  ) => void;
};

export const UserOption: React.FC<Props> = ({
  user,
  selectedId,
  selectUserHandler,
}) => {
  return (
    <a
      href={`#user-${user.id}`}
      className={classNames('dropdown-item', {
        'is-active': selectedId === user.id,
      })}
      onClick={(e) => selectUserHandler(e, user)}
    >
      {user.name}
    </a>
  );
};
