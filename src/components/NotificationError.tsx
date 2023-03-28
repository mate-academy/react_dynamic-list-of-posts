type Props = {
  errorMessage: string;
  labelData : string;
};

export const NotificationError: React.FC<Props> = ({
  errorMessage,
  labelData,
}) => {
  return (
    <div
      className="notification is-danger"
      data-cy={labelData}
    >
      {errorMessage}
    </div>
  );
};
