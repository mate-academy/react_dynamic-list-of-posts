import { ErrorMassege } from '../types/ErrorMassege';
import { NotificationType } from '../types/NotificationType';

type Props = {
  type: NotificationType;
  massege: ErrorMassege;
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
