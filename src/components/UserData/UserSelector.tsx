import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { DropdownList } from './DropdownList';
import {
  ActionTypes,
  DispatchContext,
  StateContext,
} from '../../reducer/store';
import { User } from '../../types/User';

type Props = {
};

export const UserSelector: React.FC<Props> = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { selectedUser, usersList } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)) {
      closeDropdown();
    }
  }, []);

  const selectUserHandler = useCallback(
    (user: User | null) => () => {
      dispatch({ type: ActionTypes.selectUser, user });
      closeDropdown();
    }, [],
  );

  const onShowDropdownHandler = useCallback(() => {
    setShowDropdown(oldShowState => !oldShowState);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          onClick={onShowDropdownHandler}
          aria-controls="dropdown-menu"
        >
          {selectedUser
            ? <span>{selectedUser.name}</span>
            : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <DropdownList
          list={usersList}
          chosenElem={selectedUser}
          handler={selectUserHandler}
        />
      </div>
    </div>
  );
};
