import React from 'react';
import { Post } from '../../types/post';
import './PostsList.scss';

type Props = {
  posts: Post[],
  getSelectedPostId: (postId:number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  getSelectedPostId,
  selectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                [User]
                {' '}
                {post.userId}
                :
                {' '}
              </b>
              {post.title}
              {post.body}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => getSelectedPostId(post.id)}
            >
              {(selectedPostId === post.id) ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
