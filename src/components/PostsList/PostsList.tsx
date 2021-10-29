import React from 'react';

import './PostsList.scss';

import { Post } from '../../types/Post';

type Props = {
  posts: Post[],
  selectedPostId: number,
  selectPost: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  selectPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
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
              onClick={(event) => {
                const postId = post.id === selectedPostId ? 0 : +event.currentTarget.value;

                selectPost(postId);
              }}
            >
              {post.id === selectedPostId ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
