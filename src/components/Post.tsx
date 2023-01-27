import cn from 'classnames';
import { useContext } from 'react';
import { IPost } from '../types';
import { AppContext } from './Context/AppContext';

type Props = {
  post: IPost
};

export const Post = ({ post }: Props) => {
  const {
    setPost,
    setLoading,
    setFormOpen,
    selectedPost,
  } = useContext(AppContext);

  const { id } = selectedPost || {};

  const handlePost = () => () => {
    setPost(id === post.id ? null : post);
    setFormOpen(false);
    setLoading(true);
  };

  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': id !== post.id,
          })}
          onClick={handlePost()}
        >
          {`${id === post.id
            ? 'Close'
            : 'Open'}`}
        </button>
      </td>
    </tr>
  );
};
