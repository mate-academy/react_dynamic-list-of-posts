import React, { Dispatch, SetStateAction } from 'react';
import './PostsList.scss';

import { Post } from '../../react-app-env';

type Props = {
  posts: Post[],
  selectedPostId: null | number,
  setSelectedPostId: Dispatch<SetStateAction<null | number>>;
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, setSelectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              {`[User #${post.userId}]: `}
            </b>
            {post.title}
          </div>
          {selectedPostId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(null)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => setSelectedPostId(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
