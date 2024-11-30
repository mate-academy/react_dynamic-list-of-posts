import React, { useContext } from 'react';
import classNames from 'classnames';
import { User } from '../../../../types/User';
import {
  ActiveUserContext,
  ActivePostContext,
  ErrorsContext,
  LoaderContext,
  PostsContext,
} from '../../../../utils/Store';
import { getPosts } from '../../../../utils/fetchFunctions';
import { ErrorTypes } from '../../../../types/ErrorTypes';

interface DropdownItemProps {
  user: User;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  user,
  setIsActive,
}) => {
  const { activeUser, setActiveUser } = useContext(ActiveUserContext);
  const { setPosts } = useContext(PostsContext);
  const { setIsLoading } = useContext(LoaderContext);
  const { setIsError } = useContext(ErrorsContext);
  const { setActivePost } = useContext(ActivePostContext);

  function handleMouseDownEvent(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setActiveUser(user);
    setActivePost(null);
    setPosts(null);
    setIsError(null);
    setIsLoading(true);
    setIsActive(false);

    getPosts(user.id)
      .then(res => (res.length > 0 ? setPosts(res) : setPosts(null)))
      .catch(() => {
        setIsError(ErrorTypes.Posts);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <a
      href={`#user-1${user.id}`}
      className={classNames('dropdown-item', {
        'is-active': activeUser?.id === user.id,
      })}
      onMouseDown={handleMouseDownEvent}
    >
      {user.name}
    </a>
  );
};
