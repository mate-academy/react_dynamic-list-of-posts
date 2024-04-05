import { getPosts } from '../api/posts';
import { Action } from '../types/Action';
import { Post } from '../types/Post';

export const loadPosts = (
  dispatch: (action: Action) => void,
  id: number,
): Promise<void> => {
  dispatch({ type: 'setLoading', value: true });

  return getPosts(id)
    .then((posts: Post[]) => {
      dispatch({ type: 'setPosts', posts });
    })
    .catch(() =>
      dispatch({ type: 'setError', message: 'Something went wrong!' }),
    )
    .finally(() => dispatch({ type: 'setLoading', value: false }));
};
