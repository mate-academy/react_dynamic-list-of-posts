import classNames from 'classnames';
import React from 'react';
import { Loader } from '../Loader';
import './PostsList.scss';

type Props = {
  posts: Post[];
  onChangePostId: (postId: number) => void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts, onChangePostId, selectedPostId } = props;

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {posts.length > 0 ? (
        <ul className="PostsList__list">
          {posts.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`[User #${post.userId}]`}</b>
                {post.title}
              </div>
              <button
                type="button"
                className={classNames(
                  {
                    PostsList__button: true,
                    button: true,
                    'button--active': selectedPostId === post.id,
                  },
                )}
                onClick={() => onChangePostId(post.id)}
              >
                {selectedPostId === post.id
                  ? 'Close'
                  : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
};
