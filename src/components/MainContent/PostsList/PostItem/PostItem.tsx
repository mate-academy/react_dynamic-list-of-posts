import {
  FC, useContext, useMemo, memo, useCallback,
} from 'react';
import classNames from 'classnames';
import { Post } from '../../../../types/Post';
import { PostsContext } from '../../../PostsProvider';

type Props = {
  post: Post;
};

export const PostItem: FC<Props> = memo(({ post }) => {
  const { selectedPost, handlePostSelection } = useContext(PostsContext);
  const { id, title } = post;

  const isSelected = useMemo(() => id === selectedPost?.id, [selectedPost]);

  // handler for open / close button to (not)show post details
  const handlePostView = useCallback(() => {
    if (selectedPost?.id === id) {
      handlePostSelection(null);
    } else {
      handlePostSelection(post);
    }
  }, [selectedPost]);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button is-link',
            { 'is-light': !isSelected },
          )}
          onClick={handlePostView}
        >
          {isSelected
            ? 'Close'
            : 'Open'}
        </button>
      </td>
    </tr>
  );
});
