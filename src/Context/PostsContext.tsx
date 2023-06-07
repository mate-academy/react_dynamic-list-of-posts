import {
  ReactNode, createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

interface PostsContextInterface {
  posts: Post[] | null;
  users: User[];
  loader: boolean;
  comments: Comment[];
  selectedUserId: number;
  handleClickOnUsers: (id: number) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  error: boolean;
  handleClickOpenComments: (id: number) => void;
  isOpenPost: boolean;
  chosenPost: number,
  loadingPost: boolean,
  postError: boolean,
  handleDeleteComment: (id: number) => void;
  isWriteComment: boolean;
  setIsWriteComment: (isWriteComment: boolean) => void;
  AddComment: (newComment: {}) => void;
  loadAdd: boolean;
}

const PostsContext = createContext<PostsContextInterface>({
  posts: [],
  loader: false,
  users: [],
  comments: [],
  selectedUserId: 0,
  handleClickOnUsers: () => { },
  isActive: false,
  setIsActive: () => { },
  error: false,
  handleClickOpenComments: () => { },
  isOpenPost: false,
  chosenPost: 0,
  loadingPost: false,
  postError: false,
  handleDeleteComment: () => { },
  isWriteComment: false,
  setIsWriteComment: () => { },
  AddComment: () => { },
  loadAdd: false,
});

export const PostsContextProvider = ({ children }: { children: ReactNode }) => {
  const [isWriteComment, setIsWriteComment] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(false);
  const [chosenPost, setChosenPost] = useState(0);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [postError, setPostError] = useState(false);
  const [changes, setChanges] = useState(false);
  const [loadAdd, setLoadAdd] = useState(false);

  useEffect(() => {
    const url = '/posts';

    setLoader(true);
    const loadData = async () => {
      try {
        const data = await client.get<Post[]>(url);

        setPosts(data.filter(post => post.userId === selectedUserId));
      } catch {
        setError(true);
        throw new Error('ERROR!');
      } finally {
        setLoader(false);
      }
    };

    loadData();
  }, [selectedUserId]);

  useEffect(() => {
    const url = '/users';

    const loadData = async () => {
      try {
        const data = await client.get<User[]>(url);

        setUsers(data);
      } catch {
        throw new Error('ERROR!');
      }
    };

    loadData();
  }, [users]);

  useEffect(() => {
    const url = '/comments';

    setLoadingPost(true);
    const loadData = async () => {
      try {
        const data = await client.get<Comment[]>(url);

        setComments(data.filter(comment => comment.postId === chosenPost));
      } catch {
        setPostError(false);
        throw new Error('ERROR!');
      } finally {
        setLoadingPost(false);
      }
    };

    loadData();
  }, [chosenPost, changes]);

  const handleClickOpenComments = useCallback((id: number) => {
    setChosenPost(id);
    setIsOpenPost(true);
    if (chosenPost === id) {
      setIsOpenPost(!isOpenPost);
    }

    setIsWriteComment(!setIsWriteComment);
  }, [chosenPost, isOpenPost, isWriteComment, posts, users, comments]);

  const handleClickOnUsers = useCallback((id: number) => {
    setChanges(!changes);
    setSelectedUserId(id);
    setIsActive(!isActive);
    setIsOpenPost(false);
  }, [posts, isActive, selectedUserId, changes, isOpenPost]);

  const handleDeleteComment = useCallback(async (id: number) => {
    const url = `/comments/${id}`;

    try {
      await client.delete(url);
    } catch {
      throw Error('Cannot delete comment');
    } finally {
      setChanges(!changes);
    }
  }, [isWriteComment]);

  const AddComment = async (newComment: {}) => {
    setLoadAdd(true);
    const url = '/comments/';

    try {
      await client.post(url, newComment);
    } catch {
      throw Error('Cannot add comment');
    } finally {
      setChanges(!changes);
      setLoadAdd(false);
    }
  };

  return (
    <PostsContext.Provider value={{
      AddComment,
      loadAdd,
      posts,
      users,
      comments,
      loader,
      selectedUserId,
      handleClickOnUsers,
      isActive,
      setIsActive,
      error,
      handleClickOpenComments,
      isOpenPost,
      chosenPost,
      loadingPost,
      postError,
      handleDeleteComment,
      isWriteComment,
      setIsWriteComment,
    }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => useContext(PostsContext);
