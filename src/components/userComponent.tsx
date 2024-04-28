import { User } from '../types/User';
import classNames from 'classnames';
import { getPosts } from '../api/users';
import { UserContext } from '../contexts/userContext';
import { useContext } from 'react';
import { PostContext } from '../contexts/postContext';

interface UserProps {
  user: User;
}

export const UserComponent: React.FC<UserProps> = ({ user }) => {
  const {
    setIsListOpen,
    activeUser,
    setActiveUser,
    setPostsOfUser,
    setLoadingPostsError,
    setIsPostsLoaderOn,
    setChosenUser,
  } = useContext(UserContext);

  const { setactivePostId } = useContext(PostContext);

  const handleClickOnUser = () => {
    setChosenUser(user.name);
    setactivePostId(0);
    setActiveUser(0);
    setIsListOpen(false);
    setIsPostsLoaderOn(true);
    setLoadingPostsError(false);

    getPosts(user.id)
      .then(response => {
        setActiveUser(user.id);
        setPostsOfUser(response);
      })
      .catch(() => {
        setLoadingPostsError(true);
        setActiveUser(0);
      })
      .finally(() => {
        setIsPostsLoaderOn(false);
      });
  };

  const listNameClass = classNames({
    'dropdown-item': true,
    'is-active': activeUser === user.id,
  });

  return (
    <a onMouseDown={handleClickOnUser} className={listNameClass}>
      {user.name}
    </a>
  );
};
