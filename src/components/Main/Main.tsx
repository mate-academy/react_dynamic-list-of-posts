import { Loader } from '../Loader/Loader';
import { Notification } from '../Notification/Notification';
import { PostsList } from '../PostsList/PostsList';
import { UserSelector } from '../UserSelector/UserSelector';

export const Main: React.FC = () => {
  return (
    <div className="tile is-parent">
      <div className="tile is-child box is-success">
        <div className="block">
          <UserSelector />
        </div>

        <div className="block" data-cy="MainContent">
          <p data-cy="NoSelectedUser">
            No user selected
          </p>

          <Loader />

          <Notification />

          <PostsList />
        </div>
      </div>
    </div>
  );
};
