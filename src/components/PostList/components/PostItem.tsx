import classNames from 'classnames';
import { Post } from '../../../types/Post';
import { useContext } from 'react';
import { postsContext } from '../../../context/Store';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;
  const { state, setters } = useContext(postsContext);
  const { setSelectedPost } = setters;
  const { selectedPost } = state;
  const isThePostSelected = selectedPost?.id === id;
  const buttonText = !isThePostSelected ? 'Open' : 'Close';

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': !isThePostSelected,
          })}
          onClick={() => {
            if (isThePostSelected) {
              setSelectedPost(null);
            } else {
              setSelectedPost(post);
            }
          }}
        >
          {buttonText}
        </button>
      </td>
    </tr>
  );
};
