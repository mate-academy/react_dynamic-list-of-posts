export enum ErrorTypes {
  ADD = 'Something went wrong on comment add!',
  POSTS = 'Something went wrong on posts load!',
  USERS = 'Something went wrong on users load!',
  DELETE = 'Something went wrong on comment delete!',
  COMMENTS = 'Something went wrong on comments load!',
}

export enum CommentFormErrors {
  NAME = 'Name is required',
  EMAIL = 'Email is required',
  COMMENT = 'Enter some text',
  NOTVALID = 'Enter correct e-mail',
}

export const EMAIL_REGEXP = (userEmail: string) => {
  return String(userEmail)
    .toLowerCase()
    .match(
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
