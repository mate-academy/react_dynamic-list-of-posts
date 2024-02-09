import { computed, signal } from '@preact/signals-react';
import { User } from '../types/User';
import { Post } from '../types/Post';

export const users = signal<User[]>([]);
export const selectedUser = signal<User | null>(null);
export const posts = signal<Post[]>([]);
export const isErrorVisible = signal<boolean>(false);
export const isLoaderVisible = signal<boolean>(false);
export const isNotificationVisible = computed<boolean>(() => {
  return !posts.value.length
  && !!selectedUser.value
  && !isLoaderVisible.value
  && !isErrorVisible.value;
});
