import React from 'react';
import { Post } from '../../types';
import './PostsList.scss';

type Props = {
  posts: Post[];
  onSelect: (postId: number) => void,
  selectedPost: number;
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  onSelect,
  selectedPost,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    <ul className="PostsList__list">
      {posts.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>
              {`[User #${post.userId}] : `}
            </b>
            {post.title}
          </div>
          {selectedPost === post.id
            ? (
              <button
                type="button"
                className="PostList__button button"
                onClick={() => onSelect(0)}
              >
                Close
              </button>
            )
            : (
              <button
                type="button"
                className="PostList__button button"
                onClick={() => {
                  onSelect(post.id);
                }}
              >
                Open
              </button>
            )}
        </li>
      ))}
    </ul>
  </div>
));
