import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  selectedPostId: number,
  selectPostId: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  selectPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <>
        {posts.length > 0 ? (
          <ul className="PostsList__list" data-cy="postDetails">
            {posts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
                <div>
                  <b>
                    [User:
                    {' '}
                    {post.userId}
                    ]:
                    {' '}
                  </b>
                  {post.title}
                  {post.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => selectPostId(post.id)}
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No posts yet
          </p>
        )}
      </>
    </div>
  );
};
