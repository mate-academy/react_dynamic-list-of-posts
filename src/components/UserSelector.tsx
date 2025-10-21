/* eslint-disable @typescript-eslint/indent */
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  setToggleButton: Dispatch<SetStateAction<boolean>>;
  setSelectedUserId: Dispatch<SetStateAction<number | null>>;
  toggleButton: boolean;
  users: User[];
  selectedUserId: number | null;
  setOpenSideBar: Dispatch<SetStateAction<boolean>>;
};

export const UserSelector: React.FC<Props> = ({
  setToggleButton,
  setSelectedUserId,
  toggleButton,
  users,
  selectedUserId,
  setOpenSideBar,
}) => {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setToggleButton(false);
      }
    };

    if (toggleButton) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleButton, setToggleButton]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': toggleButton })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          ref={buttonRef}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setToggleButton(!toggleButton);
          }}
        >
          <span>
            {selectedUserId
              ? users.find(user => {
                  return user.id === selectedUserId;
                })?.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        ref={dropdownRef}
        className={classNames('dropdown-menu', { 'is-active': toggleButton })}
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                onClick={event => {
                  event.preventDefault();
                  setSelectedUserId(user.id);
                  setToggleButton(false);
                  setOpenSideBar(false);
                }}
                href={`#user-${user.id}`}
                key={user.id}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUserId,
                })}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
