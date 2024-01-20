import { useContext } from 'react';
import { PostsList } from './PostsList';
import { MainContext } from '../MainContext';
import { Notification } from '../Notices/Notification';
import { Loader } from '../Notices/Loader';
import { Load } from '../../types/Load';
import { Error, Message, Warning } from '../../types/Message';

const checkMassageTg = (value: Message) => (
  value === Error.getPosts
  || value === Warning.emptyPosts
  || value === Warning.emptyUsers);

export const MainContent: React.FC = () => {
  const { notification, loadType } = useContext(MainContext);

  return (
    <div className="block" data-cy="MainContent">
      {loadType === Load.Posts
        && <Loader />}

      {checkMassageTg(notification)
        ? <Notification />
        : loadType !== Load.Posts && <PostsList />}
    </div>
  );
};
