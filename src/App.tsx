import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails, getUserPosts } from './api/posts';
import {
  getPostComments,
  deletePostComment,
  addNewComment,
} from './api/coments';
import { getAllUsers } from './api/users';

const App: React.FC = () => {
  const [postsToShow, setPostsToShow] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [postDetails, setPostDetails] = useState(null);
  const [postsComments, setPostsComments] = useState<Comment[] | []>([]);
  const [allUsers, setAllUsers] = useState([]);
  const [hideDetails, setHideDetails] = useState(false);

  useEffect(() => {
    getUserPosts('/posts')
      .then(response => setPostsToShow(response));

    getAllUsers()
      .then(response => setAllUsers(response));
  }, []);

  useEffect(() => {
    const userSelect = async () => {
      const postType = selectedUser === '0'
        ? '/posts'
        : `/posts?userId=${selectedUser}`;

      const response = await getUserPosts(postType);

      setPostsToShow(response);
    };

    userSelect();
  }, [selectedUser]);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(response => setPostDetails(response));

    getPostComments(selectedPostId)
      .then(response => setPostsComments(response));
  }, [selectedPostId]);

  const deletePostCommentById = async (commentId:number) => {
    await deletePostComment(commentId);

    getPostComments(selectedPostId)
      .then(response => setPostsComments(response));
  };

  const newComment = (body:NewComment) => {
    addNewComment(body)
      .then(response => setPostsComments([
        ...postsComments,
        response,
      ]));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value)}
          >
            <option value="0">All users</option>

            {allUsers.slice(0, 10).map(user => {
              const { id, name } = user;

              return (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              );
            })}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            postsToShow={postsToShow}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails
            selectedPostId={selectedPostId}
            postDetails={postDetails}
            postsComments={postsComments}
            hideDetails={hideDetails}
            setHideDetails={setHideDetails}
            deletePostCommentById={deletePostCommentById}
            newComment={newComment}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
