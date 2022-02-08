import React from 'react';
import './PostsList.scss';
import classnames from 'classnames';

type Props = {
  posts: Post[],
  selectedPostId: number,
  selectedPostHandler: (event: React.MouseEvent<HTMLButtonElement>, postId: number) => void,
};

export const PostsList: React.FC<Props> = ({ posts, selectedPostHandler, selectedPostId }) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    <ul className="PostsList__list">
      {posts.map((post) => (
        <li
          className="PostsList__item"
          key={post.id}
        >
          <div>
            <b>
              [User#
              {post.userId}
              ]:
            </b>
            {post.title}
          </div>
          <button
            type="button"
            className={classnames('PostsList__button button', {
              'PostsList__button-selected': post.id === selectedPostId,
            })}
            onClick={(event) => {
              selectedPostHandler(event, post.id);
            }}
          >
            Open
          </button>
        </li>
      ))}
    </ul>
  </div>
);
