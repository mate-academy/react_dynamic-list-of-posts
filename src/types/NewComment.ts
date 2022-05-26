import { Comment } from './Comment';

export type NewComment = Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>;
