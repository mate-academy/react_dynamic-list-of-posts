import { FC } from 'react';
import classNames from 'classnames';
import { Names } from '../../../types/Names';

type Props = {
  names: Names[];
  selectedUserName: string;
  chooseUser: (name: string, id: number) => void;
};

export const DropDownList: FC<Props> = ({
  names,
  selectedUserName,
  chooseUser,
}) => {
  return (
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">
        {names && names.map((user, index) => {
          const isActive = user.name === selectedUserName;

          return (
            <a
              key={user.id}
              href={`#user-${index + 1}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': isActive },
              )}
              onClick={() => chooseUser(user.name, user.id)}
            >
              {user.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};
