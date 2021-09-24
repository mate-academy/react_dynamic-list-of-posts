import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails, getUserPosts } from './api/posts';
import { UserSelect } from './components/UserSelect/UserSelect';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Partial<Post>>({});
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isPostDetailsVisible, setIsPostDetailsVisible] = useState(false);

  useEffect(() => {
    if (selectedPostId === 0) {
      setIsPostDetailsVisible(false);
    } else {
      setIsPostDetailsVisible(true);
    }

    (async () => {
      const postsFromServer = await getUserPosts(selectedUser);
      const post = await getPostDetails(selectedPostId);

      setPosts(postsFromServer);
      setSelectedPost(post);
    })();
  }, [selectedUser, selectedPostId]);

  const changePostUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(+value);
  };

  const changeSelectedPostId = (postId: number) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);
    } else {
      setSelectedPostId(postId);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          onChange={changePostUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            onChangePostId={changeSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>
        {isPostDetailsVisible && (
          <div className="App__content">
            <PostDetails
              selectedPostId={selectedPostId}
              post={selectedPost}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
