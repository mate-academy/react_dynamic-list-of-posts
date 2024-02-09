import { computed, signal } from '@preact/signals-react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { FormErrors } from '../types/FormErrors';

export const users = signal<User[]>([]);
export const selectedUser = signal<User | null>(null);
export const posts = signal<Post[]>([]);
export const selectedPost = signal<Post | null>(null);
export const comments = signal<Comment[]>([]);

export const isPostsErrorVisible = signal<boolean>(false);
export const isPostsLoaderVisible = signal<boolean>(false);
export const isPostsNotificationVisible = computed<boolean>(() => {
  return !posts.value.length
  && !!selectedUser.value
  && !isPostsLoaderVisible.value
  && !isPostsErrorVisible.value;
});

export const isCommentsErrorVisible = signal<boolean>(false);
export const isCommentsLoaderVisible = signal<boolean>(false);
export const isCommentsFormVisible = signal<boolean>(false);
export const isCommentsNotificationVisible = computed<boolean>(() => {
  return !comments.value.length
  && !!selectedPost.value
  && !isCommentsLoaderVisible.value
  && !isCommentsErrorVisible.value;
});

export const isWriteCommentButtonVisible = computed<boolean>(() => {
  return !isCommentsLoaderVisible.value
  && !isCommentsFormVisible.value
  && !isCommentsErrorVisible.value;
});

export const formInputValues = signal({
  name: '',
  email: '',
  body: '',
});
export const formErrors = signal<FormErrors>({
  name: false,
  email: false,
  body: false,
});

export const inputNameValue = signal<string>('');
export const inputEmailValue = signal<string>('');
export const inputBodyValue = signal<string>('');
