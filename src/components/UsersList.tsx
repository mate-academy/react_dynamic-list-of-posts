import { useCallback, useContext } from 'react';
import cn from 'classnames';
import { ErrorMessage, User, LoadingType, ActionType } from '../types';
import { AppContext, AppDispatchContext } from './AppState';
import { getPosts } from '../api/posts';

type Props = {
  setIsDropDownOpen: (newValue: boolean) => void;
};

export const UsersList: React.FC<Props> = ({ setIsDropDownOpen }) => {
  const { users, selectedUser } = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const handleUserSelect = useCallback(
    (user: User) => {
      dispatch({ type: ActionType.SetSelectedUser, payload: user });
      dispatch({ type: ActionType.SetLoadingType, payload: LoadingType.Posts });
      setIsDropDownOpen(false);
      getPosts(user.id)
        .then(posts => dispatch({ type: ActionType.SetPosts, payload: posts }))
        .catch(() =>
          dispatch({
            type: ActionType.SetErrorMessage,
            payload: ErrorMessage.LoadingPosts,
          }),
        )
        .finally(() =>
          dispatch({
            type: ActionType.SetLoadingType,
            payload: LoadingType.NoLoading,
          }),
        );
    },
    [dispatch, setIsDropDownOpen],
  );

  return (
    <div className="dropdown-content">
      {users.map(user => (
        <a
          href={`#user-${user.id}`}
          className={cn('dropdown-item', {
            'is-active': selectedUser?.id === user.id,
          })}
          key={user.id}
          onClick={() => handleUserSelect(user)}
        >
          {user.name}
        </a>
      ))}
    </div>
  );
};
