import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  setSelectedPostId: CallableFunction,
  selectedPostId: number | null,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPostId,
  selectedPostId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>

    <ul data-cy="postDetails" className="PostsList__list">
      {posts.map(post => (
        <>
          <li key={post.id} className="PostsList__item">
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            {selectedPostId === post.id
              ? (
                <button
                  type="button"
                  className="PostsList__button button
                  PostsList__button--active button"
                  onClick={() => setSelectedPostId(null)}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => setSelectedPostId(post.id)}
                >
                  Open
                </button>
              )}
          </li>
        </>
      ))}
    </ul>
  </div>
);
