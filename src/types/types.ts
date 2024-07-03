import { User } from './User';

export type SelectedUserId = number | null;
export type SelectedUser = User | null;
export type SelectedPostId = number | null;
export type FormErrors = {
  sendError: boolean;
  nameError: boolean;
  emailError: boolean;
  textError: boolean;
};
