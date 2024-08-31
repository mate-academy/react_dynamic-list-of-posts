export class NoUserSelectedError extends Error {
  constructor() {
    super('No user is selected');
  }
}
