type Props = {
  errorMessage: string;
};

export const FormError: React.FC<Props> = ({ errorMessage }) => (
  <p className="help is-danger" data-cy="ErrorMessage">
    {errorMessage}
  </p>
);
