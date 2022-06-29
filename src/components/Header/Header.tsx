import React, { useEffect } from 'react';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../api/posts';
import { getUsersSelector } from '../../store/selectors';
import { setUserId, setUsers } from '../../store';

export const Header:React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);

  useEffect(() => {
    const loadUsersFromServer = async () => {
      const usersFromServer = await getUsers();

      dispatch(setUsers(usersFromServer));
    };

    loadUsersFromServer();
  }, []);

  const setUserID = (userId: number) => {
    dispatch(setUserId(userId));
  };

  return (
    <header className="App__header">
      <label>
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          onChange={event => setUserID(+event.target.value)}
        >
          <option value="0">All users</option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </label>
    </header>
  );
};
