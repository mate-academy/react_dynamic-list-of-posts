import { NotificationType } from '../types/NotificationType';

type Props = {
  type: NotificationType;
  massege: string;
  dataCy: string;
};

export const Notification: React.FC<Props> = ({ type, massege, dataCy }) => (
  <div
    className={`notification ${type}`}
    data-cy={dataCy}
  >
    {massege}
  </div>
);
