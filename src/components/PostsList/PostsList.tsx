import React from 'react';
import './PostsList.scss';
import { Post } from '../../react-app-env';

interface Props {
  posts: Post[],
  currentPost:(value: number) => void
  selectedPostId: number,
}

export const PostsList: React.FC<Props> = ({
  posts,
  currentPost,
  selectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>{`[User ${post.userId}]: `}</b>
              {post.title}
            </div>
            {selectedPostId === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    currentPost(0);
                  }}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    currentPost(post.id);
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
