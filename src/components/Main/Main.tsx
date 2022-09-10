import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../Loader/Loader';
import { Notification } from '../Notification/Notification';
import { PostsList } from '../PostsList/PostsList';
import { UserSelector } from '../UserSelector/UserSelector';

import { TRootDispatch, TRootState } from '../../redux/store';
import { fetchUsers } from '../../redux/slices/userSlice';

import { EStatus } from '../../types/Status.enum';

export const Main: React.FC = () => {
  const {
    currentUser,
    status,
  } = useSelector((state: TRootState) => state.users);

  const dispatch: TRootDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="tile is-parent">
      <div className="tile is-child box is-success">
        <UserSelector />

        <div className="block" data-cy="MainContent">
          {status === EStatus.SUCCESS && !currentUser && (
            <p data-cy="NoSelectedUser">
              No user selected
            </p>
          )}

          {status === EStatus.PENDING && <Loader />}

          {status === EStatus.ERROR && <Notification />}

          <PostsList />
        </div>
      </div>
    </div>
  );
};
