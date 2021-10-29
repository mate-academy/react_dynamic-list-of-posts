import React from 'react';
import { Post } from '../../types/Post';
import './PostsList.scss';

type Props = {
  posts: Post[];
  postId: (id: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, postId }) => {
  return (
    <div className="PostsList">
      <h2>
        Posts:
        {posts.length}
      </h2>
      <ul className="PostsList__list">

        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              value={post.id}
              onClick={() => postId(post.id)}
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
