export enum Warning {
  emptyPosts = 'No posts yet',
  emptyUsers = 'No user selected',
}

export enum Error {
  getUsers = 'Something went wrong!',
  getPosts = 'Something went wrong!',
  getComments = 'Something went wrong',
}

export type Message = Warning | Error | string;
