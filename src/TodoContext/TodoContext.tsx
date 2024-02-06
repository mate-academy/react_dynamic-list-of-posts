import React, { useEffect, useState } from "react";
import { Post } from "../types/Post";
import { User } from "../types/User";
import { allUsersFromApi, getPostComments, getUserPosts } from "../utils/users";

type Props = {
  children: React.ReactNode;
};

// const USER_ID = 12157;

type ContextType = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  isDropdownActive: boolean;
  setIsDropdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  userPosts: Post[],
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  selectedPost: Post | null,
  setSelectedPost: (post: Post) => void,
  handleOpenPost: (post: Post) => void,
  choosenPost: Post | null,
  setChoosenPost: (post: Post) => void,
  postComments: Comment[],
  setPostComments: (comment: Comment[]) => void,
  setAvailNewComment: React.Dispatch<React.SetStateAction<boolean>>,
  availNewComment: boolean,
};

export const TodosContext = React.createContext<ContextType>({
  users: [],
  selectedUser: null,
  setSelectedUser: () => {},
  isDropdownActive: false,
  setIsDropdownActive: () => {},
  isLoading: false,
  setIsLoading: () => {},
  userPosts: [],
  setUserPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  handleOpenPost: () => {},
  choosenPost: null,
  setChoosenPost: () => {},
  postComments: [],
  setPostComments: () => {},
  setAvailNewComment: () => {},
  availNewComment: false,
  
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [choosenPost, setChoosenPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [availNewComment, setAvailNewComment] = useState(true);

  const handleOpenPost = (post: Post) => {
    selectedPost === post
      ? setSelectedPost(null)
      : setSelectedPost(post);
    
    return selectedPost;
  };

useEffect(() => {
  allUsersFromApi
    .getUsers()
    .then((usersFromServer) => {
      setUsers(usersFromServer);
    })
    .catch(() => {
    })
}, []);

useEffect(() => {
  if (selectedUser) {
    setIsLoading(true);

    getUserPosts(selectedUser?.id)
      .then(setUserPosts)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }
}, [selectedUser]);

useEffect(() => {
  if (!selectedPost) {
    return;
  }

  const filteredPosts = userPosts
    .find(item => item.id === selectedPost.id);

  if (filteredPosts) {
    setChoosenPost(filteredPosts);
  }
}, [userPosts, selectedPost]);

useEffect(() => {
  if (!choosenPost) {
    return;
  }

  getPostComments(choosenPost.id)
    .then(setPostComments)
    .catch(() => {})
    .finally(() => {});
}, [choosenPost]);

  return (
    <TodosContext.Provider value={{
      users,
      setSelectedUser,
      selectedUser,
      isDropdownActive,
      setIsDropdownActive,
      isLoading,
      setIsLoading,
      userPosts,
      setUserPosts,
      setSelectedPost,
      handleOpenPost,
      selectedPost,
      choosenPost,
      setChoosenPost,
      postComments,
      setPostComments,
      setAvailNewComment,
      availNewComment,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
