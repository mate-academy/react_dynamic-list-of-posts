import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getUserByName } from './api/users';
import { getPostDetails } from './api/posts';
import { getPostComments, deleteCommentFromServer } from './api/comments';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectValue, setSelectValue] = useState('All users');
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [
    selectedPostComments,
    setSelectedPostComments,
  ] = useState<Comment[] | null>(null);
  const [isPostLoading, setPostLoading] = useState(false);
  const [isPostListLoading, setPostListLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const getPost = useCallback(async () => {
    try {
      const commentsPromise = getPostComments(selectedPostId);
      const currentPost = await getPostDetails(selectedPostId);
      const currentPostComments = await commentsPromise;

      setPostLoading(false);
      setSelectedPost(currentPost);
      setSelectedPostComments(currentPostComments);
    } catch (error) {
      setPostLoading(false);
      setSelectedPost(null);
      setSelectedPostComments(null);
    }
  }, [selectedPostId]);

  useEffect(() => {
    getPost();
  }, [selectedPostId]);

  const getComments = useCallback(async () => {
    try {
      const currentPostComments = await getPostComments(selectedPostId);

      setSelectedPostComments(currentPostComments);
    } catch (error) {
      setSelectedPostComments(null);
    }
  }, [selectedPostId]);

  const deleteComment = useCallback(async (id: number) => {
    await deleteCommentFromServer(id);
    getComments();
  }, [getComments]);

  const getUserByNameFromServer = useCallback(async (username: string) => {
    try {
      const userArr = await getUserByName(username);

      setUser(userArr[0]);
      setSelectedPostId(0);
    } catch (error) {
      setUser(null);
    }
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectValue}
            onChange={({ target }) => {
              setPostListLoading(true);
              setSelectValue(target.value);
              setUser(null);
              setPosts(null);

              if (target.value === 'All users') {
                setPostListLoading(false);

                return;
              }

              getUserByNameFromServer(target.value);
            }}
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
            selectValue={selectValue}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            setPostLoading={setPostLoading}
            setSelectedPost={setSelectedPost}
            setSelectedPostComments={setSelectedPostComments}
            isPostListLoading={isPostListLoading}
            setPostListLoading={setPostListLoading}
            posts={posts}
            setPosts={setPosts}
          />
        </div>

        {selectedPost && (
          <div className="App__content">
            <PostDetails
              selectedPost={selectedPost}
              selectedPostComments={selectedPostComments}
              deleteComment={deleteComment}
              getComments={getComments}
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
