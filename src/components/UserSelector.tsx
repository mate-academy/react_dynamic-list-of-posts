import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { User } from "../types/User";

interface Props {
  users: User[] | [];
  selectedUser: User | null;
  onChangeUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onChangeUser,
}) => {
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;

      if (dropdownRef.current && !dropdownRef.current.contains(targetElement)) {
        setDropdown(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdown(false);
      }
    };

    if (dropdown) {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdown]);

  function handleSelectUser(
    user: User,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();

    if (user) {
      onChangeUser(user);
      setDropdown(false);
    }
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames("dropdown", { "is-active": dropdown })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdown(!dropdown)}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user: User) => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames("dropdown-item", {
                  "is-active": user.id === selectedUser?.id,
                })}
                onClick={(e) => handleSelectUser(user, e)}
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
