import React, { useState } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { getPostDetails, getPostComments, deleteComment } from './api/posts';
import './App.scss';
import './styles/general.scss';

const App = () => {
  const [person, setPerson] = useState({});
  const [postId, setPostId] = useState();
  const [post, setPost] = useState({});
  const [isChoosen, setIsChoosen] = useState(false);
  const [comments, setComments] = useState([]);

  const select = (user) => {
    setPerson(user);
  };

  const loadComments = (id) => {
    getPostComments(id)
      .then(result => setComments(result));
  };

  const selectedPostId = (id, buttonStatus) => {
    setIsChoosen(buttonStatus);
    setPostId(id);

    getPostDetails(id)
      .then(result => setPost(result.data));

    loadComments(id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          select={select}
          name={person.name}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            person={person}
            postId={postId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails
            post={post}
            comments={comments}
            deleteComment={commentId => deleteComment(commentId)
              .then(() => loadComments(postId))
            }
            loadComments={loadComments}
            isChoosen={isChoosen}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
