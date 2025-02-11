import { useState, useEffect, useCallback } from 'react';
import * as postService from '../api/data';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export function useLoadUsers(onError: (str: string) => void) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    postService
      .getUsers()
      .then(data => setUsers(data))
      .catch(() => onError('Something went wrong!'));
  }, []);

  return users;
}

export function useLoadPosts(
  onError: (str: string) => void,
  setIsLoading: (value: boolean) => void,
) {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const fetchPosts = useCallback(
    (userId: number | null) => {
      if (!userId) {
        setPosts(null);

        return;
      }

      setPosts(null);
      setIsLoading(true);

      postService
        .getPosts(userId)
        .then(setPosts)
        .catch(() => onError('Something went wrong!'))
        .finally(() => setIsLoading(false));
    },
    [onError, setIsLoading],
  );

  return { posts, fetchPosts };
}

export function useDeleteComment(onError: (str: string) => void) {
  const handleDelete = async (commentId: number) => {
    try {
      await postService.deleteComment(commentId);
    } catch (error) {
      onError('Failed to delete comment');
      throw error;
    }
  };

  return { handleDelete };
}

export function useCreateComment(
  onError: (str: string) => void,
  setIsLoading: (value: boolean) => void,
) {
  const [comment, setComment] = useState<Comment | null>(null);

  const createComment = useCallback(
    async (newComment: Comment) => {
      if (!newComment) {
        return;
      }

      setIsLoading(true);
      try {
        const createdComment = await postService.postComment(newComment);

        setComment(createdComment);
      } catch {
        onError('Failed to add comment');
      } finally {
        setIsLoading(false);
      }
    },
    [onError, setIsLoading],
  );

  return { comment, createComment };
}
