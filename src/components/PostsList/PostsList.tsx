import React from 'react';
import { Post } from '../../react-app-env';
import './PostsList.scss';

type Prop = {
  posts: Post[],
  selectedPostId: number,
  setSelectedPostId: (postId: number) => void,
};

export const PostsList: React.FC<Prop> = ({
  posts,
  selectedPostId,
  setSelectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={
              () => setSelectedPostId(post.id === selectedPostId ? 0 : post.id)
            }
          >
            {
              (post.id === selectedPostId)
                ? 'Close'
                : 'Open'
            }
          </button>
        </li>
      ))}
    </ul>
  </div>
);
