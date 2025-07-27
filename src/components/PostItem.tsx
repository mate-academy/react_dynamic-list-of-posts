import { Post } from '../types/Post';

interface Props {
  post: Post;
  setSelectedPost: (post: Post | null) => void;
  isSelected: boolean;
  setIsSideBarShown: (isShown: boolean) => void;
}

export const PostItem: React.FC<Props> = ({
  post,
  setSelectedPost,
  isSelected,
  setIsSideBarShown,
}) => {
  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={'button is-link' + (isSelected ? '' : ' is-light')}
          onClick={() => {
            if (isSelected) {
              setSelectedPost(null);
              setIsSideBarShown(false);
            } else {
              setSelectedPost(post);
              setIsSideBarShown(true);
            }
          }}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
