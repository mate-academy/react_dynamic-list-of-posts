import React from 'react';
import './PostsList.scss';
import classNames from 'classnames';

type SetSelectedPostId = (postId: number) => void;

type Props = {
  postsList: Post[];
  selectedPostId: number;
  setSelectedPostId: SetSelectedPostId;
};

export const PostsList: React.FC<Props> = (props) => {
  const { postsList, setSelectedPostId, selectedPostId } = props;

  const handleOpenPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedPostId(+event.currentTarget.name);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postsList.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>
            <button
              type="button"
              className={classNames(
                'PostsList__button',
                'button',
                { 'PostsList__button--opened': selectedPostId === post.id },
              )}
              name={String(post.id)}
              onClick={handleOpenPost}
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
