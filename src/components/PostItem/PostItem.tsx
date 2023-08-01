import { useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';
import { PostContext } from '../../context/PostContext';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { selectedPost, setSelectedPost } = useContext(PostContext);

  const isCurrentPostSelected = selectedPost && selectedPost.id === post.id;

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': !isCurrentPostSelected,
          })}
          onClick={() => {
            if (isCurrentPostSelected) {
              setSelectedPost(null);
            } else {
              setSelectedPost(post);
            }
          }}
        >
          {isCurrentPostSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
