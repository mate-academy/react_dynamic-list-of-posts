import { NewComment } from './NewComment';

export interface Comment extends NewComment {
  id: number,
  createdAt: string,
  updatedAt: string,
}
