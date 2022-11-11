import {
  FC, useContext, useState, useCallback, useMemo, memo,
} from 'react';
import { UsersContext, UsersUpdateContext } from '../UsersProvider';
import { DropDownList } from './DropDownList';
import { DropDownTrigger } from './DropDownTrigger';

export const UserSelector: FC = memo(() => {
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

  // handler to show drop down list of users
  const handleDropDown = useCallback(() => (
    setIsShown(current => !current)
  ), []);

  // handler of selected user
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
});
