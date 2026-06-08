import { Comment } from '../types/Comment';
import { FormErrors } from '../types/Errors';

export const errorsSetter = (
  comment: Comment,
  field: 'name' | 'email' | 'body',
  value: boolean,
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
) =>
  comment[field]?.trim() === '' &&
  setFormErrors(prev => ({ ...prev, [field]: value }));
