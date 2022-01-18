import React from 'react';
import './PostsList.scss';
import { Post } from '../../Types/Post';

type Props = {
  allPosts: Post[],
  selectedPostId: (postId: number | null) => void,
  postId: number | null,
};

export const PostsList: React.FC<Props> = ({ allPosts, selectedPostId, postId }) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {allPosts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                [ User #
                {post.userId}
                {' '}
                ]:
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                selectedPostId(post.id === postId
                  ? null
                  : post.id);
              }}
            >
              {
                postId === post.id
                  ? 'Close'
                  : 'Open'
              }
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
