import React, { MouseEventHandler } from 'react';
// Types
import { ChangeId } from '../../types/ChangeId';

type Props = {
  selectedPostId: number;
  id: number;
  userId: string;
  body: string;
  onChangePostId: ChangeId;
};

export const PostCard: React.FC<Props> = ({
  selectedPostId, id, userId, body, onChangePostId,
}) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const buttonText = e.currentTarget.textContent;

    if (buttonText === 'Open') {
      onChangePostId(id);
    } else {
      onChangePostId(0);
    }
  };

  return (
    <>
      <div>
        <b>
          [User #
          {userId}
          ]:
          {' '}
        </b>
        {body}
      </div>
      <button
        type="button"
        className="PostsList__button button"
        onClick={clickHandler}
      >
        {id === selectedPostId ? 'Close' : 'Open'}
      </button>
    </>
  );
};
