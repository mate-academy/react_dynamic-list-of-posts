import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { getPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { deleteComment, getComments } from '../../api/comments';

type ErrorContextType = {
  isLoading: boolean,
  isError: boolean,
  isLoadingPosts: boolean,
};

type UserIdType = {
  userId: User | null,
  handleUserSelect: (id: User) => void,
};

type ComentsDataType = {
  comments: Comment[],
  newCommentSelect: (newComment: Comment) => void,
  hendleRemoveComment: (id: number) => void,
};

type PostDataType = {
  postData: Post | null,
  handlePost: (postDetails: Post) => void
};

type Props = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<User[] | null>(null);
export const ErrorContext
  = React.createContext<ErrorContextType>({} as ErrorContextType);
export const UserIdContext = React.createContext<UserIdType>({} as UserIdType);
export const PostsContext
  = React.createContext<Post[]>([]);
export const CommentsContext
  = React.createContext<ComentsDataType>({} as ComentsDataType);
export const PostDataContext
  = React.createContext<PostDataType>({} as PostDataType);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingPosts, setIsLoaidingPosts] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userId, setUserId] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [postData, setPostData] = useState<Post | null>(null);

  const handleUserSelect = (id: User) => {
    setUserId(id);

    setPostData(null);
  };

  const newCommentSelect = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const handlePost = (postDetails: Post) => {
    if (postData?.id === postDetails.id) {
      setPostData(null);
    } else {
      setPostData(postDetails);
    }
  };

  const loadUsersFromServer = async () => {
    try {
      const getUsersFromServer = await getUsers();

      setUsers(getUsersFromServer);
    } catch (error) {
      setIsError(true);
    }
  };

  const loadPostsFromServer = async () => {
    try {
      setIsLoaidingPosts(true);
      const getPostsFromServer = await getPosts(userId);

      setPosts(getPostsFromServer);
    } catch (error) {
      setIsError(true);
      setIsLoaidingPosts(false);
    } finally {
      setIsLoaidingPosts(false);
      setIsError(false);
    }
  };

  const loadCommentsFromServer = async () => {
    try {
      setIsloading(true);
      const getCommentsFromServer = await getComments(postData);

      setComments(getCommentsFromServer);
    } catch (error) {
      setIsError(true);
      setIsloading(false);
    } finally {
      setIsloading(false);
      setIsError(false);
    }
  };

  const hendleRemoveComment = async (id: number) => {
    try {
      await deleteComment(id);
      const visibleComments = comments.filter(comment => {
        return comment.id !== id;
      });

      setComments(visibleComments);
    } catch {
      setIsError(true);
    }
  };

  const loadComments = useCallback(() => {
    loadCommentsFromServer();
  }, [postData]);

  useEffect(() => {
    loadUsersFromServer();
  }, []);

  useEffect(() => {
    if (userId) {
      loadPostsFromServer();
    }
  }, [userId]);

  useEffect(() => {
    if (postData) {
      loadComments();
    }
  }, [postData]);

  return (
    <UserContext.Provider value={users}>
      <ErrorContext.Provider value={{ isLoading, isError, isLoadingPosts }}>
        <UserIdContext.Provider value={{ userId, handleUserSelect }}>
          <PostsContext.Provider value={posts}>
            <PostDataContext.Provider value={{ postData, handlePost }}>
              <CommentsContext.Provider value={{
                comments,
                newCommentSelect,
                hendleRemoveComment,
              }}
              >
                {children}
              </CommentsContext.Provider>
            </PostDataContext.Provider>
          </PostsContext.Provider>
        </UserIdContext.Provider>
      </ErrorContext.Provider>
    </UserContext.Provider>
  );
};
