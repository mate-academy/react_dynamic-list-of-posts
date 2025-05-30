import { CyData } from './CyData';
import { MessageType } from './MessageType';

export interface NotificationMessage {
  text: string;
  type: MessageType;
  cyData: CyData;
}
