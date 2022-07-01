import React from 'react';
import './PostsList.scss';

interface Props {
  posts: Post[];
  selectedPostId: number;
  handlePostId: (postId: number) => void
}

export const PostsList: React.FC<Props> = ({
  posts,
  handlePostId,
  selectedPostId,
}) => (
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
              {`[User #${post.userId}]: `}
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => handlePostId(post.id)}
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
