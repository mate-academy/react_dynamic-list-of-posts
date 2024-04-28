import { CommentData } from '../types/Comment';

function checkName(value: string) {
  const normalizedValue = value.trim();

  return normalizedValue.length === 0 ? 'Name is required!' : '';
}

function checkEmail(value: string) {
  const normalizedValue = value.trim();

  return normalizedValue.length === 0 ? 'Email is required!' : '';
}

function checkBody(value: string) {
  const normalizedValue = value.trim();

  return normalizedValue.length === 0 ? 'Enter some text!' : '';
}

export function checkFormFiels(commentData: CommentData) {
  return {
    name: checkName(commentData.name),
    email: checkEmail(commentData.email),
    body: checkBody(commentData.body),
  };
}

export const checkErrors = (formError: CommentData) => {
  const errors = Object.entries(formError).filter(error => error[1].length > 0);

  return errors.length === 0;
};
