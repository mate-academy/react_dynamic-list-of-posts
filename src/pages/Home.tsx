import { UserSelector } from '../components/UserSelector';

export const Home = () => {
  return (
    <div className="tile is-child box is-success">
      <div className="block">
        <UserSelector />
      </div>
      <div className="block" data-cy="MainContent">
        <p data-cy="NoSelectedUser">No user selected</p>
      </div>
    </div>
  );
};
