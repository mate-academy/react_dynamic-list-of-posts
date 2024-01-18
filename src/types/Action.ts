import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';
import { Error } from './Error';

export type Action = { type: 'setUsers', payload: User[] }
| { type: 'setSelectedUser', payload: User | null }
| { type: 'setPosts', payload: Post[] }
| { type: 'setSelectedPost', payload: Post | null }
| { type: 'setIsLoadingPosts', payload: boolean }
| { type: 'setComments', payload: Comment[] }
| { type: 'addComment', payload: Comment }
| { type: 'deleteComment', payload: Comment }
| { type: 'setIsLoadingComments', payload: boolean }
| { type: 'setIsOpenForm', payload: boolean }
| { type: 'setError', payload: Error | '' };
