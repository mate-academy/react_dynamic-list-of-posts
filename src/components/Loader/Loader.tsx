import './Loader.scss';

type Props = {
  isLoading: boolean;
};

export const Loader: React.FC<Props> = ({ isLoading }) => {
  return isLoading ? (
    <div className="Loader" data-cy="Loader">
      <div className="Loader__content" />
    </div>
  ) : null;
};
