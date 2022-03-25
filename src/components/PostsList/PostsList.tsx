import React from 'react';
import './PostsList.scss';

type Props = {
  posts: Post[];
  postId: number;
  onDetails: (event: React.MouseEvent<HTMLButtonElement>) => void
};

export const PostsList: React.FC<Props> = ({ posts, onDetails, postId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    <ul className="PostsList__list">
      {posts.map(post => (
        <li key={post.id} className="PostsList__item">
          <div>
            <b>
              [User #
              {post.userId}
              ]:
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className="PostsList__button button"
            value={post.id}
            onClick={onDetails}
          >
            {
              postId === post.id
                ? <>Close</>
                : <>Open</>
            }
          </button>
        </li>
      ))}
    </ul>
  </div>
);
