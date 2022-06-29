import React from 'react';
import classNames from 'classnames';
import './PostsList.scss';
import { Post } from '../../react-app-env';

interface Props {
  posts: Post[],
  selectPostId: number,
  onSelectedPostId: (postId: number) => void,
}

export const PostsList: React.FC<Props> = ({
  posts, selectPostId, onSelectedPostId,
}) => {
  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className={classNames('PostsList__button', 'button', {
                // eslint-disable-next-line max-len
                'PostsList__button--active': selectPostId === post.id,
              })}
              onClick={() => (
                selectPostId === post.id
                  ? onSelectedPostId(0)
                  : onSelectedPostId(post.id))}
            >
              {selectPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
