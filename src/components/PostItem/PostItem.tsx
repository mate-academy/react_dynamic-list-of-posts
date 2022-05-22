import React from 'react';
import './PostItem.scss';
import cn from 'classnames';

type Props = {
  post: Post;
  onSelectPostId: (x: number) => void;
  selectedPostId: number | null;
};

export const PostItem: React.FC<Props> = ({
  post,
  onSelectPostId,
  selectedPostId,
}) => {
  const onButtonClick = () => {
    onSelectPostId(post.id);
  };

  const isPostOpen = selectedPostId === post.id;

  return (
    <li className="PostItem">
      <div>
        <b>{`[User #${post.userId}]: `}</b>
        {post.title}
      </div>
      <button
        type="button"
        className={cn(
          'PostItem__button', 'button',
          {
            'PostItem__user-button': isPostOpen,
          },
        )}
        onClick={onButtonClick}
      >
        {isPostOpen ? 'Close' : 'Open'}
      </button>
    </li>
  );
};
