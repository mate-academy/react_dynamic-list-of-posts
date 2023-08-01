import classNames from 'classnames';
import React from 'react';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props<T> = {
  list: T[] | null
  chosenElem: T | null
  handler: (elem: (T | null)) => () => void
};

const DropdownList:React.FC<Props<User>> = React.memo((
  {
    list,
    chosenElem,
    handler,
  },
) => {
  return (
    <div className="dropdown-content">
      {list
        && list.map(elem => (
          <a
            key={elem.id}
            href={`#user-${elem.id}`}
            className={classNames(
              'dropdown-item',
              { 'is-active': chosenElem?.id === elem.id },
            )}
            onClick={handler(elem)}
          >
            {elem.name}
          </a>
        ))}

      {!list && <Loader />}
    </div>
  );
});

export { DropdownList };
