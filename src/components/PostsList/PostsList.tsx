/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { FC } from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  selectedId: number;
  selectPost: (postId: number) => void;
};

export const PostsList: FC<Props> = ({ posts, selectedId, selectPost }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 && posts.map(post => (
          <li key={post.id} className="PostsList__item">
            <h4 className="PostsList__title">
              [User #
              {`${post.userId}`}
              ]:
              {' '}
              {post.title}
            </h4>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => selectPost(post.id)}
            >
              {selectedId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
