import {
  FC,
  useState,
  useCallback,
  useContext,
  useMemo,
  memo,
} from 'react';

import { DropDownList } from './DropDownList';
import { DropDownTrigger } from './DropDownTrigger';
import { UsersContext, UsersUpdateContext } from '../../context/UsersContext';

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

  const handleDropDown = useCallback(() => (
    setIsShown((current) => !current)
  ), []);

  const chooseUser = useCallback(async (name: string, id: number) => {
    handleUserNameSelection(name, id);
    setIsShown((current) => !current);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <DropDownTrigger
        selectedUserName={selectedUserName}
        handleDropDown={handleDropDown}
      />

      {isShown && names
        && (
          <DropDownList
            names={names}
            selectedUserName={selectedUserName}
            chooseUser={chooseUser}
          />
        )}
    </div>
  );
});
