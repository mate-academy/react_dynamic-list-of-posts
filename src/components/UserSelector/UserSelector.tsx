import {
  useCallback, useContext, useState, useRef,
} from 'react';
import classNames from 'classnames';

import { DispatchContext, StateContext } from '../../store';
import { actions } from '../../libs/actions/actions';
import { loadPosts } from '../../api/posts';
import { UserSelectorItem } from './UserSelectorItem';
import { User } from '../../libs/types';
import { Messages } from '../../libs/enums';
import { useOutsideClick } from '../../libs/hooks';

export const UserSelector: React.FC = () => {
  const {
    users: { users, selectedUser },
  } = useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu]);

  const handleSelectUser = useCallback((user: User) => {
    setIsOpenMenu(false);

    if (selectedUser?.id === user.id) {
      return;
    }

    actions.deselectUser(dispatch);
    actions.deselectPost(dispatch);

    actions.hideErrorMessage(dispatch);
    actions.showLoader(dispatch);

    loadPosts(user.id)
      .then((response) => {
        actions.loadPosts(dispatch, response);
      })
      .catch(() => {
        actions.showErrorMessage(dispatch);
      })
      .finally(() => {
        actions.selectUser(dispatch, user);
        actions.hideLoader(dispatch);
      });
  }, [dispatch, selectedUser]);

  const selectedUserTitle = selectedUser?.name || Messages.ChooseUser;

  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => {
    setIsOpenMenu(false);
  });

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpenMenu,
      })}
      ref={menuRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenMenu}
        >
          <span>
            {selectedUserTitle}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <ul className="dropdown-content">
          {users.map((user => (
            <UserSelectorItem
              key={`#user-${user.id}`}
              user={user}
              onSelect={handleSelectUser}
            />
          )))}
        </ul>
      </div>
    </div>
  );
};
