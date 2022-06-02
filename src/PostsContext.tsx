import {
  createContext, Dispatch, FC, SetStateAction, useEffect, useState,
} from 'react';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getUserPosts } from './api/posts';
import { getPostComments } from './api/comments';

interface PostsContextInterface {
  posts: Post[],
  setPosts: Dispatch<SetStateAction<Post[]>>,
  selectedUserId: number,
  setSelectedUserId: Dispatch<SetStateAction<number>>,
  selectedPostId: number,
  setSelectedPostId: Dispatch<SetStateAction<number>>,
  showComments: boolean,
  setShowComments: Dispatch<SetStateAction<boolean>>,
  loadComments: () => void | Promise<void>,
  postComments: Comment[],
  setPostComment: Dispatch<SetStateAction<Comment[]>>,
  postsIsLoading: boolean,
  setPostsIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const PostsContext = createContext<PostsContextInterface>({
  posts: [],
  setPosts: () => {},
  selectedUserId: 0,
  setSelectedUserId: () => {},
  selectedPostId: 0,
  setSelectedPostId: () => {},
  showComments: false,
  setShowComments: () => {},
  loadComments: () => {},
  postComments: [],
  setPostComment: () => {},
  postsIsLoading: false,
  setPostsIsLoading: () => {},
});

export const PostsProvider: FC = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [postsIsLoading, setPostsIsLoading] = useState(false);

  const loadPosts = async () => {
    setPostsIsLoading(true);

    const data = await getUserPosts(selectedUserId);

    setPosts(data);

    setPostsIsLoading(false);
  };

  const loadComments = async () => {
    const data = await getPostComments(selectedPostId);

    setPostComments(data);
  };

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  useEffect(() => {
    loadComments();
  }, [selectedPostId]);

  const contextValues = {
    posts,
    setPosts,
    selectedUserId,
    setSelectedUserId,
    selectedPostId,
    setSelectedPostId,
    showComments,
    setShowComments,
    loadComments,
    postComments,
    setPostComment: setPostComments,
    postsIsLoading,
    setPostsIsLoading,
  };

  return (
    <PostsContext.Provider value={contextValues}>
      {children}
    </PostsContext.Provider>
  );
};
