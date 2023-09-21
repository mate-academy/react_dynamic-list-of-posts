/* eslint-disable */
// eslint-disable
import React, { useContext, useEffect, useState } from 'react';
import {
  getAllUsers,
  getPost,
} from '../utils/loadutil';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { StateContext } from './AppContext';
import { ACTIONS } from '../utils/enums';
// import { PostsList } from './PostsList';

type Props = {
  allUsers: User[],
  setPosts: (posts: Post[]) => void,
}

export const UserSelector: React.FC<Props> = ({ allUsers, setPosts }) => {
  const [showUsers, setShowUsers] = useState(false);
  const [choosenUser, setChoosenUser] = useState(0);
  const [_users, setAllUsers] = useState([] as User[]);
  const [_postsByUser, _setPostByUser] = useState([] as Post[]);
  const [isUserSelected, setIsUserSelected] = useState('Choose a user');
  const { dispatch } = useContext(StateContext);

  function chooseUser(user: User) {
    setChoosenUser(user.id);
    setShowUsers(!showUsers)
    setIsUserSelected(user.name)
    // setPostByUser(allUsers.filter(user => user.id === userId));
    dispatch({ type: ACTIONS.SET_SELECTED_USER, payload: user })
    getPost(user.id)
      .then(res => setPosts(res))
  }

  useEffect(() => {
    getAllUsers()
      .then(res => {
        setAllUsers(res)
      });
  }, []);

  function handleUserSelect() {
    setShowUsers(!showUsers);
  }
  console.log(choosenUser);


  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger" onClick={handleUserSelect}>
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {isUserSelected}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {showUsers && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {allUsers.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => chooseUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
      {/* {postsByUser.length > 0 && (
        <PostsList usersPosts={postsByUser} />
      )} */}
    </div>
  );
};
