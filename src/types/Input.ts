export enum Input {
  Email = 'Email',
  Name = 'Name',
  Body = 'Body',
}

export const HolderMap = (): {
  [key in Input]: string;
} => ({
  Email: 'email@test.com',
  Name: 'Name Surname',
  Body: 'Type comment here',
});

export const LabelMap = (): {
  [key in Input]: string;
} => ({
  Email: 'Author Email',
  Name: 'Author Name',
  Body: 'Comment Text',
});

export enum InputError {
  Email = 'Email is required',
  Name = 'Name is required',
  Body = 'Enter some text',
}

export const ErrorMap = (): {
  [key in Input]: string;
} => ({
  Email: 'Email is required',
  Name: 'Name is required',
  Body: 'Enter some text',
});
