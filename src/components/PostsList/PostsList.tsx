import React from 'react';
import './PostsList.scss';
import { Post } from '../../Post';

type Props = {
  posts: Post[],
  setSelectedPostId: (id: number | null) => void,
  selectedPostId: number | null,
};

export const PostsList: React.FC<Props> = ({
  posts, setSelectedPostId, selectedPostId,
}) => {
  const clickHandler = (id: number) => {
    if (selectedPostId === id) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(id);
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
              onClick={() => clickHandler(post.id)}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
};
