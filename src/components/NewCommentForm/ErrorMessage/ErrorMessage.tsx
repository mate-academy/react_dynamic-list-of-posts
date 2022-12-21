import { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const ErrorMessage: FC<Props> = ({ children }) => {
  return (
    <p className="help is-danger" data-cy="ErrorMessage">
      {children}
    </p>
  );
};
