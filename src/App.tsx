import { useCallback, useState, FC } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getUserByName } from './api/users';
import { getPostComments } from './api/comments';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { Loader } from './components/Loader';
import { getPostDetails } from './api/posts';

const App: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectValue, setSelectValue] = useState('All users');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [
    selectedPostComments,
    setSelectedPostComments,
  ] = useState<Comment[]>([]);
  const [isPostLoading, setPostLoading] = useState(false);

  const getPostFromServerByID = useCallback(async () => {
    try {
      if (selectedPostId) {
        const commentsPromise = getPostComments(selectedPostId);
        const currentPost = await getPostDetails(selectedPostId);
        const currentPostComments = await commentsPromise;

        setPostLoading(false);
        setSelectedPost(currentPost);
        setSelectedPostComments(currentPostComments);
      }
    } catch (error) {
      setPostLoading(false);
      setSelectedPost(null);
      setSelectedPostComments([]);
    }
  }, [selectedPostId]);

  const getCommentsFromServer = useCallback(async () => {
    try {
      if (selectedPostId) {
        const currentPostComments = await getPostComments(selectedPostId);

        setSelectedPostComments(currentPostComments);
      }
    } catch (error) {
      setSelectedPostComments([]);
    }
  }, [selectedPostId]);

  const getUserByNameFromServer = useCallback(async (username: string) => {
    try {
      const userArr = await getUserByName(username);

      setUser(userArr[0]);
      setSelectedPostId(null);
    } catch (error) {
      setUser(null);
    }
  }, []);

  const handleOpenPostDetails = useCallback((id: number) => {
    if (selectedPostId === id) {
      setPostLoading(false);
      setSelectedPostId(null);
      setSelectedPost(null);
      setSelectedPostComments([]);

      return;
    }

    setSelectedPost(null);
    setSelectedPostComments([]);
    setPostLoading(true);
    setSelectedPostId(id);
  }, [selectedPostId]);

  const handleSelectUser = useCallback((value: string) => {
    setSelectValue(value);
    setUser(null);

    if (value === 'All users') {
      return;
    }

    getUserByNameFromServer(value);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectValue}
            onChange={({ target }) => handleSelectUser(target.value)}
          >
            <option value="All users">
              All users
            </option>

            <option value="Leanne Graham">
              Leanne Graham
            </option>

            <option value="Ervin Howell">
              Ervin Howell
            </option>

            <option value="Clementine Bauch">
              Clementine Bauch
            </option>

            <option value="Patricia Lebsack">
              Patricia Lebsack
            </option>

            <option value="Chelsey Dietrich">
              Chelsey Dietrich
            </option>

            <option value="Mrs. Dennis Schulist">
              Mrs. Dennis Schulist
            </option>

            <option value="Kurtis Weissnat">
              Kurtis Weissnat
            </option>

            <option value="Nicholas Runolfsdottir V">
              Nicholas Runolfsdottir V
            </option>

            <option value="Glenna Reichert">
              Glenna Reichert
            </option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            user={user}
            selectedPostId={selectedPostId}
            selectValue={selectValue}
            handleOpenPostDetails={handleOpenPostDetails}
            getPostFromServerByID={getPostFromServerByID}
          />
        </div>

        {selectedPost && (
          <div className="App__content">
            <PostDetails
              selectedPost={selectedPost}
              selectedPostComments={selectedPostComments}
              getComments={getCommentsFromServer}
            />
          </div>
        )}

        {isPostLoading && (
          <div className="App__content">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
