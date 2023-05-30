import { Error } from './Error';

export interface UserSelectorProps {
  currentUserId: number;
  handleUserSelect: (userId: number) => void;
  setError: (error: Error) => void;
}
