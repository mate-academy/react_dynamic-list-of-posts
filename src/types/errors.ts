export class FormError extends Error {
  constructor(
    message: string,
    public sendError?: boolean,
    public nameError?: boolean,
    public emailError?: boolean,
    public textError?: boolean,
  ) {
    super(message);
  }
}
