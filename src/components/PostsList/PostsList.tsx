import React from 'react';
import { Post } from '../../types/post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  onSelectPost: (id: number) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectPost,
  selectedPostId,
}) => {
  const handleSelectPost = (id: number) => {
    if (id === selectedPostId) {
      onSelectPost(0);
    } else {
      onSelectPost(id);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleSelectPost(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
