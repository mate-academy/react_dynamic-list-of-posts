import { FC } from 'react';
import { DropdownItem } from './index';
import { DropdownMenuProps } from '../../types';

export const DropdownMenu: FC<DropdownMenuProps> = ({
  users,
  selectUser,
}) => (
  <div
    role="menu"
    id="dropdown-menu"
    className="dropdown-menu"
  >
    <div className="dropdown-content">
      {users.map(({ id, name }) => (
        <DropdownItem
          key={id}
          id={id}
          name={name}
          selectUser={selectUser}
        />
      ))}
    </div>
  </div>
);
