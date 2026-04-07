/* eslint-disable @typescript-eslint/indent */
import { useCallback, useContext, useEffect, useState } from 'react';
import { PostsContext } from '../../context/PostsContext';
import { client } from '../../utils/fetchClient';
import { Comment } from '../../types/Comment';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { selectedPost } = useContext(PostsContext);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [isCommentFormActive, setIsCommentFormActive] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isAddCommentLoading, setIsAddCommentLoading] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setIsLoadingComments(true);
    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(fetchedComments => {
        setComments(fetchedComments);
      })
      .catch(() => {
        setCommentsError('Something went wrong');
      })
      .finally(() => {
        setIsLoadingComments(false);
      });
  }, [selectedPost]);

  const handleDeleteComment = useCallback(
    (comment: Comment) => {
      setComments(prevComments =>
        prevComments.filter(com => com.id !== comment.id),
      );
      client
        .delete(`/comments/${comment.id}`)
        .then(() => {})
        .catch(() => {
          setCommentsError('Something went wrong');
        });
    },
    [comments],
  );

  const handleAddComment = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (name: string, email: string, postId: number, body: string) => {
      setIsAddCommentLoading(true);
      client
        .post<Comment>('/comments', {
          name,
          email,
          postId,
          body,
        })
        .then(com => {
          setComments(prev => [...prev, com]);
        })
        .catch(() => {
          setCommentsError('Something went wrong');
        })
        .finally(() => {
          setIsAddCommentLoading(false);
        });
    },
    [],
  );

  return {
    comments,
    isLoadingComments,
    commentsError,
    setIsLoadingComments,
    isCommentFormActive,
    setIsCommentFormActive,
    handleDeleteComment,
    handleAddComment,
    authorName,
    setAuthorName,
    email,
    setEmail,
    commentText,
    setCommentText,
    isAddCommentLoading,
    setIsAddCommentLoading,
  };
};
