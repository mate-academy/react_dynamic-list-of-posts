import React from 'react';
import { UserPost } from '../../react-app-env';

type PostItemType = {
  selectedPostId: number,
  post: UserPost,
  setSelectedPostId: (postId: number) => void,
};

export const PostItem: React.FC<PostItemType> = ({
  post, selectedPostId, setSelectedPostId,
}) => {
  return (
    <li className="PostsList__item">
      <div>
        <b>{`[User #${post.userId}]: `}</b>
        <p>{post.title}</p>
      </div>
      <button
        type="button"
        className="PostsList__button button"
        onClick={() => {
          const currentValue = selectedPostId === post.id ? -1 : post.id;

          setSelectedPostId(currentValue);
        }}
      >
        {selectedPostId === post.id ? 'Close' : 'Open'}
      </button>
    </li>
  );
};
