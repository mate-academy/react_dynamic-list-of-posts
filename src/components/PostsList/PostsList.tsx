import React, { useState } from 'react';
import classNames from 'classnames';
import './PostsList.scss';
import { Post } from '../../types/types';

type Props = {
  posts: Post[];
  onSelect: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({ posts, onSelect }) => {
  const [selectedPostId, setSelectedPostId] = useState(0);

  const isPostSelected = (postId: number) => {
    return selectedPostId === postId;
  };

  const resetSelectedPost = (post: Post) => {
    if (selectedPostId === post.id) {
      setSelectedPostId(0);
      onSelect(null);
    } else {
      setSelectedPostId(post.id);
      onSelect(post);
    }
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => {
          return (
            <li key={post.id} className="PostsList__item">
              <div>
                <b>{`User ID #${post.userId}: `}</b>
                {post.title}
              </div>

              <button
                type="button"
                className={classNames(
                  'PostsList__button',
                  'button',
                  { 'button--active': isPostSelected(post.id) },
                )}
                onClick={() => resetSelectedPost(post)}
              >
                {isPostSelected(post.id) ? 'Close' : 'Open'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
