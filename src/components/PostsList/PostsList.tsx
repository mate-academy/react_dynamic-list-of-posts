import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  handleSetPostId: (id:number) => void;
  selectedPostId: Post['id'];
};

export const PostsList: React.FC<Props> = ({ posts, handleSetPostId, selectedPostId }) => (

  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          {selectedPostId === post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleSetPostId(0)}
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => handleSetPostId(post.id)}
            >
              Open
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
