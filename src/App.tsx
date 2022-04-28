import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import * as postApi from './api/api';
import { UserSelect } from './components/UserSelect/UserSelect';

const App: React.FC = () => {
  const [posts, newList] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [postDetails, setPostDetails] = useState('');
  const [postComments, setPostComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (selectedUserId === 0) {
      postApi.getAllPosts()
        .then((newPosts) => {
          return newList(newPosts);
        });
    } else {
      postApi.getUserPosts(selectedUserId)
        .then((userPosts) => {
          return newList(userPosts);
        });
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedPostId !== '') {
      postApi.getPostDetails(selectedPostId)
        .then((title) => {
          return setPostDetails(title.body);
        });
      postApi.getPostComments(selectedPostId)
        .then((comments) => {
          return setPostComments(comments);
        });
    }
  }, [selectedPostId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedUserId(+event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedPostId(event.currentTarget.value);
  };

  const addComment = (
    name: string,
    email: string,
    text: string,
  ) => {
    postApi.addNewComment(name, email, text, selectedPostId)
      .then((comments) => {
        return setPostComments(comments);
      });
  };

  const deleteComment = (commentId: string) => {
    postApi.deleteComment(commentId)
      .then((comments) => {
        return setPostComments(comments);
      });
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect user={handleChange} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            click={handleClick}
            status={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== '' && (
            <PostDetails
              details={postDetails}
              comments={postComments}
              onAdd={addComment}
              onDelete={deleteComment}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
