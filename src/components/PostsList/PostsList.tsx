import React from 'react';
import classNames from 'classnames';
import './PostsList.scss';

type Props = {
  posts: Post[];
  onPostSelect(postId: number): void;
  selectedPostId: number | null;
};

export const PostsList: React.FC<Props> = ({ posts, onPostSelect, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className={classNames(
              'PostsList__button',
              'button',
              { 'PostsList__button--is-selected': selectedPostId === post.id },
            )}
            onClick={() => onPostSelect(post.id)}
          >
            {selectedPostId === post.id ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
