import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number | null,
  openPost: (postId: number | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  openPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.length > 0 && posts.map((post) => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User #${post.id}]: `}</b>
              {post.title}
            </div>
            {post.id === selectedPostId ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  openPost(null);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  openPost(post.id);
                }}
              >
                Open
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
