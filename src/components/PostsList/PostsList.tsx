import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[];
  selectedPostId: number;
  onSelectedPost: (selectedId: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, onSelectedPost }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {posts && posts.length ? (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              key={post.id}
              className="PostsList__item"
            >
              <div>
                <b>
                  [User
                  {post.userId}
                  ]:
                </b>
                {post.title}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => onSelectedPost(post.id)}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      ) : <p>There are currently no posts</p>}
    </div>
  );
};
