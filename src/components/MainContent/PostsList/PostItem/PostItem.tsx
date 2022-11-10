import {
  FC, useContext, useMemo,
} from 'react';
import classNames from 'classnames';
import { Post } from '../../../../types/Post';
import { PostsContext } from '../../PostsProvider';

type Props = {
  post: Post;
};

export const PostItem: FC<Props> = ({ post }) => {
  const { selectedPostId, handlePostSelection } = useContext(PostsContext);
  const { id, title } = post;

  const isSelected = useMemo(() => id === selectedPostId, [selectedPostId]);

  const handlePostView = () => {
    if (selectedPostId === id) {
      handlePostSelection(0);
    } else {
      handlePostSelection(id);
    }
  };

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
};
