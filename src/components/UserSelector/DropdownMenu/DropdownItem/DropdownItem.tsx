import React, { useContext } from 'react';
import classNames from 'classnames';
import { User } from '../../../../types/User';
import {
  ActivePostContext,
  ActiveUserContext,
  ErrorsContext,
  LoaderContext,
  PostsContext,
} from '../../../../utils/Store';
import { getPosts } from '../../../../utils/fetchFunctions';
import { ErrorTypes } from '../../../../types/types';

interface DropdownItemProp {
  user: User;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownItem: React.FC<DropdownItemProp> = ({
  user,
  setIsActive,
}) => {
  const { activeUser, setActiveUser } = useContext(ActiveUserContext);
  const { setIsLoading } = useContext(LoaderContext);
  const { setPosts } = useContext(PostsContext);
  const { setIsError } = useContext(ErrorsContext);
  const { setActivePost } = useContext(ActivePostContext);

  function handleMouseDown(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setActiveUser(user);
    setIsError(null);
    setPosts(null);
    setIsActive(false);
    setIsLoading(true);
    setActivePost(null);

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
      onMouseDown={event => handleMouseDown(event)}
    >
      {user.name}
    </a>
  );
};
