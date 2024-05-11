import React, { useContext } from 'react';
import { PostContext } from '../context/PostProvider';
import cn from 'classnames';
import { Post } from '../types/Post';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { selectedPost, setSelectedPost } = useContext(PostContext);

  const openPostHandler = () => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <tr data-cy="Post" key={post.id}>
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': post.id !== selectedPost?.id,
          })}
          onClick={openPostHandler}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
