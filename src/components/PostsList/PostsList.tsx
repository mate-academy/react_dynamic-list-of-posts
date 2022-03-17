import React from 'react';
import { Post } from '../../types/Post';
import { SelectedPostId } from '../../types/SelectedPostId';

import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: SelectedPostId,
  setSelectedPostId: React.Dispatch<React.SetStateAction<SelectedPostId>>
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    {posts.length === 0
      ? <h3>No posts from this user yet</h3>
      : (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  if (post.id === selectedPostId) {
                    setSelectedPostId(null);
                  } else {
                    setSelectedPostId(post.id);
                  }
                }}
              >
                {post.id === selectedPostId ? 'Close' : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      )}
  </div>
);
