import { User } from './User';

export interface DropdownItemProps {
  id: number;
  name: string;
  selectUser: (id: number) => void;
}

export interface DropdownMenuProps {
  users: User[];
  selectUser: (id: number) => void;
}

export interface DropdownTriggerProps {
  userName: string;
  toggleDropdown: () => void;
}
