import React from 'react';
import { PostListProps } from '../../types';
import './PostsList.scss';

export const PostsList: React.FC<PostListProps> = ({
  postsList, onPostSelect, selectedPost,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postsList.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`User #${post.userId}`}
                :
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => onPostSelect(post.id)}
            >
              {selectedPost === post ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
