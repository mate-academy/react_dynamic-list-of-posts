import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  handleClick: (postId: number) => void,

};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, handleClick }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              value={selectedPostId}
              onClick={() => handleClick(post.id)}
            >
              {selectedPostId === post.id
                ? 'Close'
                : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
