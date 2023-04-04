import { FC } from 'react';
import cn from 'classnames';
import { User } from '../../types/User';

interface Props {
  user: User,
  currentUserName: string,
  onSelect: (user: User) => void
}

export const UserInfo: FC<Props> = (props) => {
  const { user, onSelect, currentUserName } = props;
  const { id, name } = user;

  return (
    <a
      key={id}
      href={`#user-${id}`}
      className={cn('dropdown-item', {
        'is-active': currentUserName === user.name,
      })}
      onClick={() => onSelect(user)}
    >
      {name}
    </a>
  );
};
