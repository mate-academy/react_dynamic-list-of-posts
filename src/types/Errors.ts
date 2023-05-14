export enum Errors {
  Name = 'Name is required',
  Email = 'Email is required',
  Body = 'Enter some text',
  Loading = 'Something went wrong',
}

export type FieldErrors = {
  name: boolean,
  email: boolean,
  body: boolean
};
