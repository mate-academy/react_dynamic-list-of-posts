import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export function getComments(
  postId: number,
  funcSetComments: (comments: Comment[]) => void,
  funcSetLoader: (value: boolean) => void,
) {
  getPostComments(postId).then(response => {
    if ('Error' in response) {
      console.warn(response.Error); // eslint-disable-line
    } else {
      funcSetComments(response);
    }
  }).finally(() => funcSetLoader(false));
}
