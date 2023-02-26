import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment, getPostComments, sendComment } from '../utils/comments';
import { getPost } from '../utils/posts';
import { CommentsList } from './CommentsList';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
}) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCommentSending, setIsCommentSending] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const {
          id,
          body,
          title,
          userId,
        } = await getPost(selectedPostId);

        setSelectedPost({
          id,
          body,
          title,
          userId,
        });
      } catch {
        setIsError(true);
      }
    };

    loadPost();
  }, [selectedPostId]);

  useEffect(() => {
    const loadComments = async () => {
      setIsProcessed(false);
      setIsLoading(true);
      setIsError(false);
      try {
        const serverData = await getPostComments(selectedPostId);

        setComments(serverData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsProcessed(true);
      }
    };

    loadComments();
  }, [selectedPostId]);

  const handleDelete = async (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
    try {
      await deleteComment(id);
    } catch {
      setIsError(true);
    }
  };

  const addNewComment = async (comment: Comment) => {
    setIsCommentSending(true);
    try {
      const serverResp = await sendComment(comment);
      const {
        id,
        email,
        name,
        body,
      } = serverResp;

      setComments([...comments,
        {
          id,
          email,
          name,
          body,
          postId: comment.postId,
        },
      ]);
    } catch {
      setIsError(true);
    } finally {
      setIsCommentSending(false);
    }
  };

  useEffect(() => {
    setIsFormOpen(false);
  }, [selectedPostId]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost?.body}
        </p>
      </div>

      <CommentsList
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        comments={comments}
        isLoading={isLoading}
        isProcessed={isProcessed}
        isError={isError}
        handleDelete={handleDelete}
      />

      {isFormOpen && (
        <NewCommentForm
          postId={selectedPostId}
          addNewComment={addNewComment}
          isCommentSending={isCommentSending}
        />
      )}
    </div>
  );
};
