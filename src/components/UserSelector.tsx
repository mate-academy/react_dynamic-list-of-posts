import React, {
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [active, setActive] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User>();

  useEffect(() => {
    client.get<User[]>('/users')
      .then(data => setUsers(data));
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': active,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          onClick={() => setActive(!active)}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {selected ? selected.name : 'Choose a user' }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length > 0 && users.map(el => {
            return (
              <a
                href={`#user-${el.id}`}
                className={classNames('dropdown-item', {
                  'is-active': el.id === selected?.id,
                })}
                key={el.id}
                onClick={(event) => {
                  event.preventDefault();
                  setSelected(el);
                  setActive(false);
                }}
              >
                {`${el.name}`}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
