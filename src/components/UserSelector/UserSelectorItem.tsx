import { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { StateContext } from '../../store';
import { User } from '../../libs/types';

type Props = {
  user: User,
  onSelect: (user: User) => void,
};

export const UserSelectorItem: React.FC<Props> = ({ user, onSelect }) => {
  const {
    users: { selectedUser },
  } = useContext(StateContext);

  const isSelected = user.id === selectedUser?.id;

  const handleSelectUser = useCallback(() => {
    onSelect(user);
  }, [user, onSelect]);

  return (
    <li>
      <a
        href={`#user-${user.id}`}
        className={classNames('dropdown-item', {
          'is-active': isSelected,
        })}
        onClick={handleSelectUser}
      >
        {user.name}
      </a>
    </li>
  );
};
