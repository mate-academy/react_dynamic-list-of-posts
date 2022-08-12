import { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/Post';
import { Header } from './components/Header/Header';

const App: React.FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [userSelected, setUserSelected] = useState(0);
  const [showDetails, setShowDetails] = useState<null | number>(null);

  return (
    <div className="App">
      <Header
        setUserSelected={setUserSelected}
        setShowDetails={setShowDetails}
      />

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            postList={postList}
            setPostList={setPostList}
            userSelected={userSelected}
            setShowDetails={setShowDetails}
            showDetails={showDetails}
          />
        </div>
        <div className="App__content">
          {
            showDetails && (
              <PostDetails
                showDetails={showDetails}
              />
            )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
