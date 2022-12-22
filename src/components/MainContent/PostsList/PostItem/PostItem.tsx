import {
  FC,
  memo,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import classNames from 'classnames';
import { Post } from '../../../../types/Post';
import { PostsContext } from '../../../../context/PostsContext';

type Props = {
  post: Post;
};

export const PostItem: FC<Props> = memo(({ post }) => {
  const {
    selectedPost,
    handlePostSelection,
  } = useContext(PostsContext);

  const { id, title } = post;

  const isSelected = useMemo(() => (
    id === selectedPost?.id
  ), [selectedPost]);

  const handlePostView = useCallback(() => {
    if (id === selectedPost?.id) {
      handlePostSelection(null);
    } else {
      handlePostSelection(post);
    }
  }, [selectedPost]);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">
        {id}
      </td>

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
