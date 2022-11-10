import {
  FC, useContext, useState, useCallback, useMemo,
} from 'react';
import { UsersContext, UsersUpdateContext } from '../UsersProvider';
import { DropDownList } from './DropDownList';
import { DropDownTrigger } from './DropDownTrigger';

export const UserSelector: FC = () => {
  const { users, selectedUserName } = useContext(UsersContext);
  const { handleUserNameSelection } = useContext(UsersUpdateContext);
  const [isShown, setIsShown] = useState(false);

  const names = useMemo(
    () => users?.map(({ name, id }) => {
      return {
        name,
        id,
      };
    }), [users],
  );

  const handleDropDown = useCallback(() => (
    setIsShown(current => !current)
  ), []);

  const chooseUser = useCallback(async (name: string, id: number) => {
    handleUserNameSelection(name, id);
    setIsShown(current => !current);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <DropDownTrigger
        handleDropDown={handleDropDown}
        selectedUserName={selectedUserName}
      />

      {isShown && names
        && (
          <DropDownList
            names={names}
            selectedUserName={selectedUserName}
            chooseUser={chooseUser}
          />
        ) }
    </div>
  );
};
