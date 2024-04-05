import React, { useContext, useState, useEffect } from 'react';
import { Post } from '../types/Post';
import { DispatchContext } from '../Store';
import classNames from 'classnames';

type Props = {
  post: Post;
  selectedId?: number;
};

export const PostItem: React.FC<Props> = ({ post, selectedId }) => {
  const [buttonText, setButtonText] = useState('Open');
  const { id, title } = post;

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (selectedId !== undefined && selectedId === id) {
      setButtonText('Close');
    } else {
      setButtonText('Open');
    }
  }, [selectedId, id]);

  const handleOnClick = () => {
    const isOpen = buttonText === 'Open';

    dispatch({ type: 'toggleSideBar', payload: isOpen });

    if (isOpen) {
      dispatch({ type: 'setSelectedPost', id });
    }

    setButtonText(isOpen ? 'Close' : 'Open');
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

      <td data-cy="PostTitle">{title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': buttonText === 'Open',
          })}
          onClick={handleOnClick}
        >
          {buttonText}
        </button>
      </td>
    </tr>
  );
};
