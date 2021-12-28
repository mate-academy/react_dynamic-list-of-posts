import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  setPostId: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostId, setPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.title} className="PostsList__item">
          <div>
            <b>
              [User #
              {post.userId}
              ]:
            </b>
            {' '}
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => {
              setPostId(post.id);
            }}
          >
            {selectedPostId === post.id ? 'Close' : 'Open'}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
