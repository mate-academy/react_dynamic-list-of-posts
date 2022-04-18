import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

interface Props {
  posts: Post[],
  selectedPostId: number,
  selectPost: (postId: number) => void
}

export const PostsList: React.FC<Props> = React.memo(
  ({ posts, selectedPostId, selectPost }) => {
    return (
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul className="PostsList__list">
          {
            posts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
                <div>
                  <b>
                    {`[User #${post.userId}]: `}
                  </b>
                  {post.body}
                </div>
                {
                  selectedPostId === post.id
                    ? (
                      <button
                        type="button"
                        className="PostsList__button button"
                        onClick={() => selectPost(0)}
                      >
                        Close
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        className="PostsList__button button"
                        onClick={() => selectPost(post.id)}
                      >
                        Open
                      </button>
                    )
                }

              </li>
            ))
          }
        </ul>
      </div>
    );
  },
);
