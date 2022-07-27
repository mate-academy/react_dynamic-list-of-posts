import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  selectedPostId: number;
  onOpenPost(postId: number): void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onOpenPost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul className="PostsList__list">
      {posts.map(post => (
        <li className="PostsList__item" key={post.id}>
          <div>
            <b>{`[User #${post.userId}]: `}</b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            onClick={() => onOpenPost(post.id)}
          >
            {
              selectedPostId === post.id
                ? 'Close'
                : 'Open'
            }
          </button>
        </li>
      ))}
    </ul>
  </div>
);
