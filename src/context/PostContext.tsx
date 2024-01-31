import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Errors } from '../types/Errors';
import { getUsers } from '../api/users';
import { getUserPosts } from '../api/posts';
import { getPostComments } from '../api/comments';

type PostContextType = {
  users: User[];
  setUsers: (user: User[]) => void;
  userPosts: Post[];
  setUserPosts: (post: Post[]) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  selectedPostId: number | null;
  setSelectedPostId: (postId: number) => void;
  loadingList: boolean;
  setLoadingList: (load: boolean) => void;
  loadingComments: boolean;
  setLoadingComments: (load: boolean) => void;
  postComments: Comment[];
  setPostComments: (comment: Comment[]) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  post: Post | null;
  setPost: (post: Post) => void;
  setNewComment: (com: boolean) => void;
  loadingForm: boolean;
  setLoadingForm: (load: boolean) => void;
  newCommentShown: boolean;
  setNewCommentShown:(newCom: boolean) => void;
  handlePostOpen: (post: Post) => void;
};

export const PostContext = React.createContext<PostContextType>({
  users: [],
  setUsers: () => { },
  userPosts: [],
  setUserPosts: () => { },
  selectedUser: null,
  setSelectedUser: () => {},
  selectedPostId: null,
  setSelectedPostId: () => { },
  loadingList: false,
  setLoadingList: () => { },
  loadingComments: false,
  setLoadingComments: () => { },
  postComments: [],
  setPostComments: () => { },
  errorMessage: '',
  setErrorMessage: () => { },
  post: null,
  setPost: () => { },
  setNewComment: () => { },
  loadingForm: false,
  setLoadingForm: () => { },
  newCommentShown: true,
  setNewCommentShown: () => { },
  handlePostOpen: () => { },
});

export const PostProvider: React.FC<{ children: ReactNode }> = (
  { children },
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [loadingList, setLoadingList] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const [newCommentShown, setNewCommentShown] = useState(true);

  const handlePostOpen = (p: Post) => {
    setSelectedPostId(selectedPostId === p.id
      ? 0
      : p.id);

    setNewCommentShown(true);
  };

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingList(true);

      getUserPosts(selectedUser?.id)
        .then(setUserPosts)
        .catch(() => setErrorMessage(Errors.SomethingWrong))
        .finally(() => setLoadingList(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    const filteredPosts = userPosts
      .find(item => item.id === selectedPostId);

    if (filteredPosts) {
      setPost(filteredPosts);
    }
  }, [userPosts, selectedPostId]);

  useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    setLoadingComments(true);

    getPostComments(selectedPostId)
      .then(setPostComments)
      .catch(() => setErrorMessage(Errors.SomethingWrong))
      .finally(() => setLoadingComments(false));
  }, [selectedPostId, newComment]);

  const value = {
    users,
    setUsers,
    userPosts,
    setUserPosts,
    selectedUser,
    setSelectedUser,
    selectedPostId,
    setSelectedPostId,
    loadingList,
    setLoadingList,
    loadingComments,
    setLoadingComments,
    postComments,
    setPostComments,
    errorMessage,
    setErrorMessage,
    post,
    setPost,
    setNewComment,
    loadingForm,
    setLoadingForm,
    newCommentShown,
    setNewCommentShown,
    handlePostOpen,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
