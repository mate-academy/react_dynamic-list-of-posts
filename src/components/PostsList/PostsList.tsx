import React from 'react';
import './PostsList.scss';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[],
  selectedPostId: number,
  selectPost: (value: number) => void
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, selectPost }) => {
  const openPost = (postId: number) => {
    if (postId === selectedPostId) {
      selectPost(0);
    } else {
      selectPost(postId);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {
          posts.map((post) => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => openPost(post.id)}
              >
                {selectedPostId === post.id ? 'Close' : 'Open' }
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
