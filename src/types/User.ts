export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Users {
  users: User[];
  onListUser: () => void;
  showUser: boolean;
  onUserId: (id: number) => void;
  userId: number;
  setIsShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
}
