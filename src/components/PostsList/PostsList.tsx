import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  onSelectedPostId: (selectedId: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, onSelectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      { posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>
              [User #
              {post.userId}
              ]:
            </b>
            {post.body}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => onSelectedPostId(post.id)}
          >
            { selectedPostId === post.id ? 'Close' : 'Open' }
          </button>
        </li>
      ))}
    </ul>
  </div>
);
