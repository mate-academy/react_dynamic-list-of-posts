import { ErrorMessages } from '../enums';
import { ErrorMessagesKeys } from '../types';

export const getErrorMessages = (values: Record<string, string>) => {
  const errorMessages: Record<string, string> = {};

  Object.entries(values).forEach(([name, value]) => {
    if (!value.trim()) {
      errorMessages[name] = ErrorMessages[name as ErrorMessagesKeys];
    }
  });

  return errorMessages;
};
