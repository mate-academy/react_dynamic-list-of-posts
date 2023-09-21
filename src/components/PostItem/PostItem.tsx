import { Post } from '../../types/Post';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;

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
          className="button is-link is-light"
        >
          Open
        </button>
      </td>
    </tr>
  );
};
