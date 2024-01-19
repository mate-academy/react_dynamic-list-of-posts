import { Post } from './Post';
import { User } from './User';
import { Message } from './Message';
import { Comment } from './Comment';
import { Load } from './Load';

export interface PostsProps {
  loadType: Load,
  isForm: boolean,
  isAddButton: boolean,
  notification: Message,
  currentUser: number | null,
  currentPost: Post | null,
  comments: Comment[],
  users: User[] | null,
  posts: Post[] | null,

  setCurrentUser: (val: number | null) => void,
  setCurrentPost: (val: Post | null) => void,
  setComments: (val: Comment[]) => void,
  setPosts: (val: Post[] | null) => void,
  setUsers: (val: User[] | null) => void,
  setLoadType: (val: Load) => void,
  setNotification: (val: Message) => void,
  setIsAddButton: (val: boolean) => void,
  setIsForm: (val: boolean) => void,

  isReset: boolean,
  isError: boolean,
  setIsError: (val: boolean) => void,
  setIsReset: (val: boolean) => void,
}
