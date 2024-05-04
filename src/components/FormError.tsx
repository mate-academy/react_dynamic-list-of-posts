type Props = {
  message: string;
};

export const FormError: React.FC<Props> = ({ message }) => (
  <p className="help is-danger" data-cy="ErrorMessage">
    {message}
  </p>
);
