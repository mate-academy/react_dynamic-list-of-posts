import { ErrorMessages } from '../enums';

export type ErrorMessagesKeys = keyof typeof ErrorMessages;

export type ErrorMessagesType = {
  [Key in ErrorMessagesKeys]: string;
};
