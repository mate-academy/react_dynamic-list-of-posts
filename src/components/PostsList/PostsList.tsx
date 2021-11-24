import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[],
  seePostDetails: (postId: number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = React.memo(
  ({ posts, seePostDetails, selectedPostId }) => (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 && (posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                {`[User ${post.userId}]:`}
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => seePostDetails(0)}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => seePostDetails(post.id)}
              >
                Open
              </button>
            )}
          </li>
        )))}
      </ul>
    </div>
  ),
);
