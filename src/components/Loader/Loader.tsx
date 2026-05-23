import './Loader.scss';

type Props = {
  isLoading: boolean;
};

export const Loader: React.FC<Props> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="Loader" data-cy="Loader">
      <div className="Loader__content" />
    </div>
  );
};
