import React, { useContext } from 'react';
import { Post } from '../types/Post';
import { AppContext } from '../context/ContextProvider';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { selectedPost, setSelectedPost } = useContext(AppContext);

  const handlePostClick = () => {
    if (!selectedPost) {
      setSelectedPost(post);
    } else if (selectedPost.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

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
          className="button is-link"
          onClick={handlePostClick}
        >
          {selectedPost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
