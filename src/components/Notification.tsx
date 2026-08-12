type Props = {
  message: string;
  color: 'is-danger' | 'is-warning' | 'is-success' | 'is-info';
  dataCy?: string;
};

export const Notification = ({ message, color, dataCy }: Props) => (
  <div className={`notification ${color}`} data-cy={dataCy}>
    {message}
  </div>
);
