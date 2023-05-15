import { FormField } from '../types/FormField';

export const FORM_FIELDS: FormField[] = [
  {
    name: 'name',
    label: 'Author Name',
    id: 'comment-author-name',
    placeholder: 'Name Surname',
    icon: 'fa-user',
  },
  {
    name: 'email',
    label: 'Author Email',
    id: 'comment-author-email',
    placeholder: 'email@test.com',
    icon: 'fa-envelope',
  },
  {
    name: 'body',
    label: 'Comment Text',
    id: 'comment-body',
    placeholder: 'Type comment here',
    icon: '',
  }];
