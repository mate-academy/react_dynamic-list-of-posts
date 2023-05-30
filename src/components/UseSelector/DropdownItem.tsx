import classNames from 'classnames';
import { FC, useContext } from 'react';
import { UserSelectorContext } from '../../context';
import { DropdownItemProps } from '../../types';

export const DropdownItem: FC<DropdownItemProps> = ({
  id,
  name,
  selectUser,
}) => {
  const { currentUserId } = useContext(UserSelectorContext);

  return (
    <a
      href={`#user-${id}`}
      className={classNames('dropdown-item', {
        'is-active': currentUserId === id,
      })}
      onClick={() => selectUser(id)}
    >
      {name}
    </a>
  );
};
