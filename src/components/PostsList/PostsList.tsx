import React from 'react';
import { Post } from '../../react-app-env';

import './PostsList.scss';

type Props = {
  posts: Post[];
  onSelectPostId: (postId: number) => void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelectPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              {`[User #${post.userId}]:`}
            </b>
            {post.title}
          </div>

          {post.id !== selectedPostId
            ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  onSelectPostId(post.id);
                }}
              >
                Open
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  onSelectPostId(0);
                }}
                style={{ backgroundColor: 'red' }}
              >
                Close
              </button>
            )}
        </li>
      ))}
    </ul>
  </div>
);
