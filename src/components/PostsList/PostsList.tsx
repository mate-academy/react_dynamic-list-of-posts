import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  setSelectedPostId: (selectedPostId: number | null) => void,
  selectedPostId: number | null,
};

export const PostsList: React.FC<Props> = ({ posts, setSelectedPostId, selectedPostId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]:`}
                {' '}
              </b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                setSelectedPostId(post.id === selectedPostId
                  ? null
                  : post.id);
              }}
            >
              {post.id === selectedPostId
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
