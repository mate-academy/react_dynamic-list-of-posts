import { useEffect, useState } from 'react';
import { getPosts } from '../api/posts/postApi';
import { Post } from '../types/Post';
import { User } from '../types/User';
import {
  addComment,
  deleteComment,
  getComments,
} from '../api/comments/commentsApi';
import { Comment } from '../types/Comment';
import { getUsers } from '../api/users/postsApi';
import { ErrorMessages } from '../types/ErrorMessages';
import { useDropdownRef } from './useDropdownRef';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [isOpenCommentForm, setIsOpenCommentForm] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const [currentError, setCurrentError] = useState<ErrorMessages | null>(null);

  const { dropdownRef, isOpenDropdown, setIsOpenDropdown } = useDropdownRef();

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const loadPosts = async () => {
      setIsLoadingPosts(true);

      try {
        const post = await getPosts(selectedUser.id);

        setPosts(post);
      } catch (error) {
        setCurrentError(ErrorMessages.PostsLoadingError);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    loadPosts();
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    const loadComments = async () => {
      setIsLoadingComments(true);

      try {
        const comment = await getComments(selectedPost.id);

        setComments(comment);
      } catch (error) {
        setCurrentError(ErrorMessages.PostsLoadingError);
      } finally {
        setIsLoadingComments(false);
      }
    };

    loadComments();
  }, [selectedPost]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await getUsers();

        setUsers(result);
      } catch (error) {
        console.error(error);
      }
    };

    loadUsers();
  }, []);

  const handleSelectUser = (id: number) => {
    const result = users.find(user => user.id === id);

    setSelectedUser(result || null);
    setIsOpenDropdown(false);

    setIsOpenSidebar(false);
    setSelectedPost(null);
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setIsLoadingAdd(true);

    const newComment: Comment = {
      id: 0,
      postId: selectedPost?.id ?? null,
      name: inputName,
      email: inputEmail,
      body: inputMessage,
    };

    try {
      const result: Comment = await addComment(newComment);

      setComments(prev => [...prev, result]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAdd(false);
      setIsSubmitted(false);
      setInputMessage('');
    }
  };

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleInputMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputMessage(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpenDropdown(prev => !prev);
  };

  const toggleSidebar = (postId: number) => {
    setIsOpenCommentForm(false);

    if (selectedPost?.id === postId) {
      setIsOpenSidebar(false);
      setSelectedPost(null);
    } else {
      setIsOpenSidebar(true);
      const newPost = posts.find(p => p.id === postId) || null;

      setSelectedPost(newPost);
    }
  };

  const toggleCommentForm = () => {
    setIsOpenCommentForm(true);
  };

  const onResetForm = () => {
    setInputName('');
    setInputEmail('');
    setInputMessage('');
  };

  return {
    posts,
    users,
    comments,
    isLoadingPosts,
    isLoadingComments,
    isOpenSidebar,
    isOpenDropdown,
    isOpenCommentForm,
    selectedUser,
    selectedPost,
    handleSelectUser,
    handleDeleteComment,
    handleInputName,
    handleInputEmail,
    handleInputMessage,
    toggleDropdown,
    toggleSidebar,
    toggleCommentForm,
    inputName,
    inputEmail,
    inputMessage,
    onResetForm,
    handleAddComment,
    isLoadingAdd,
    dropdownRef,
    currentError,
  };
};
