import { useContext } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';
import { PostsContext } from '../services/Store';

type Props = {
  postItem: Post;
};

export const PostItem: React.FC<Props> = ({ postItem }) => {
  const { id, body } = postItem;

  const { selectedPostId, setSelectedPostId } = useContext(PostsContext);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{body}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': selectedPostId !== id,
          })}
          onClick={() => {
            if (selectedPostId === id) {
              setSelectedPostId(null);
            } else {
              setSelectedPostId(id);
            }
          }}
        >
          {selectedPostId === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
