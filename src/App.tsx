import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { UserSelector } from './components/UserSelector';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';
import { useUser } from './hooks/useUser';
import { usePosts } from './hooks/usePosts';
import { useComments } from './hooks/useComments';
import { User } from './types/User';
import { Post } from './types/Post';
import { useState, useEffect } from 'react';
import cn from 'classnames';

export const App = () => {
  const { users } = useUser();
  const {
    posts,
    isLoading: isLoadingPosts,
    error: errorPosts,
    getPostsFromServer,
    setIsLoading: setPostsLoading,
  } = usePosts();
  const {
    comments,
    isLoading: isLoadingComments,
    error: errorComments,
    getCommentsFromServer,
    addComment,
    deleteComment,
    isLoadingForAdd,
  } = useComments();

  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const isUserSelected = !!selectedPerson;
  const isPostSelected = !!selectedPost;

  useEffect(() => {
    if (!selectedPost) {
      setIsFormVisible(false);
    }
  }, [selectedPost]);

  const handleGetPosts = async (userId: number) => {
    if (!getPostsFromServer) {
      return;
    }

    if (setPostsLoading) {
      setPostsLoading(true);
    }

    await new Promise(r => setTimeout(r, 500));
    await getPostsFromServer(userId);
    if (setPostsLoading) {
      setPostsLoading(false);
    }
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    getCommentsFromServer(post.id);
    setIsFormVisible(true);
  };

  const hasPosts = posts.length > 0;
  const shouldShowPostsList = isUserSelected && hasPosts;
  const shouldShowNoPostsYet =
    isUserSelected && !hasPosts && !isLoadingPosts && !errorPosts;

  return (
    <main className="section">
      <div className={`app-container ${isPostSelected ? 'with-sidebar' : ''}`}>
        <div
          className={cn('left-panel', 'box', { 'full-width': !isPostSelected })}
        >
          <UserSelector
            data-cy="UserSelector"
            users={users}
            getPostsFromServer={handleGetPosts}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
            setSelectedPost={setSelectedPost}
            setIsFormVisible={setIsFormVisible}
          />

          <div className="content-area" data-cy="MainContent">
            {!isUserSelected && (
              <p data-cy="NoSelectedUser">No user selected</p>
            )}
            {isLoadingPosts && <Loader data-cy="Loader" />}
            {errorPosts && (
              <div className="notification is-danger">{errorPosts}</div>
            )}
            {shouldShowNoPostsYet && (
              <div className="notification is-warning">No posts yet</div>
            )}
            {shouldShowPostsList && (
              <PostsList
                posts={posts}
                selectedPost={selectedPost}
                setSelectedPost={handleSelectPost}
                setIsFormVisible={setIsFormVisible}
              />
            )}
          </div>
        </div>

        {isPostSelected && selectedPost && (
          <div className="right-panel box">
            <PostDetails
              post={selectedPost}
              comments={comments}
              isLoadingComments={isLoadingComments}
              errorComments={errorComments}
              deleteComment={deleteComment}
              isFormVisible={isFormVisible}
              setIsFormVisible={setIsFormVisible}
              addComment={addComment}
              isLoadingForAdd={isLoadingForAdd}
            />
          </div>
        )}
      </div>
    </main>
  );
};
