import React from 'react';
import Post from '../types/Post';
import './PostsList.scss';

interface Props{
  posts: Post[];
  selectedPostId: number,
  handleSelectedPostId: (postId: number) => void,
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  handleSelectedPostId,
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
                [User #
                {' '}
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
              onClick={() => (
                handleSelectedPostId(post.id))}
            >
              { selectedPostId === post.id ? ('Close') : ('Open')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
