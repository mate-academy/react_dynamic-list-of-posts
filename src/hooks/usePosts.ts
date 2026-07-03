import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const usePosts = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [selection, setSelection] = useState<{
    user: User | null;
    post: Post | null;
  }>({
    user: null,
    post: null,
  });

  const [loading, setLoading] = useState({ posts: false, comments: false });
  const [errors, setErrors] = useState({ posts: '', comments: '' });

  const handlePostClick = (post: Post) => {
    setSelection(prev => ({
      ...prev,
      post: prev.post?.id === post.id ? null : post,
    }));
  };

  const handleSelectUser = (user: User) => {
    setSelection({
      user,
      post: null,
    });
  };

  const handleDeleteComment = async (commentId: number) => {
    const commentToDelete = comments.find(comment => comment.id === commentId);

    if (!commentToDelete) {
      return;
    }

    setErrors(prev => ({ ...prev, comments: '' }));
    setComments(prev => prev.filter(comment => comment.id !== commentId));

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      setComments(prev => [...prev, commentToDelete]);
      setErrors(prev => ({
        ...prev,
        comments: 'Failed to delete comment. Please try again.',
      }));
    }
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(prev => ({ ...prev, posts: true }));

      try {
        const data = await client.get<User[]>('/users');

        setUsers(data);
      } catch {
        setErrors(prev => ({ ...prev, posts: 'Failed to load users' }));
      } finally {
        setLoading(prev => ({ ...prev, posts: false }));
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selection.user) {
        setPosts([]);

        return;
      }

      setLoading(prev => ({ ...prev, posts: true }));
      setErrors(prev => ({ ...prev, posts: '' }));

      try {
        const data = await client.get<Post[]>(
          `/posts?userId=${selection.user.id}`,
        );

        setPosts(data);
      } catch {
        setErrors(prev => ({ ...prev, posts: 'Failed to load posts' }));
      } finally {
        setLoading(prev => ({ ...prev, posts: false }));
      }
    };

    fetchPosts();
  }, [selection.user]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!selection.post) {
        setComments([]);

        return;
      }

      setLoading(prev => ({ ...prev, comments: true }));
      setErrors(prev => ({ ...prev, comments: '' }));

      try {
        const data = await client.get<Comment[]>(
          `/comments?postId=${selection.post.id}`,
        );

        setComments(data);
      } catch {
        setErrors(prev => ({ ...prev, comments: 'Failed to load comments' }));
      } finally {
        setLoading(prev => ({ ...prev, comments: false }));
      }
    };

    fetchComments();
  }, [selection.post]);

  return {
    users,
    posts,
    comments,
    selectedUser: selection.user,
    selectedPost: selection.post,
    isPostsLoading: loading.posts,
    postsError: errors.posts,
    isCommentsLoading: loading.comments,
    commentsError: errors.comments,
    handleSelectUser,
    handlePostClick,
    handleDeleteComment,
    handleAddComment,
  };
};
