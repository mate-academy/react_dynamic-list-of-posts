import React, { useEffect, useState } from 'react';
import {
  addComment, deleteComment, getPostComments, getPostDetails,
} from '../../api/posts';
import { PostDetailsUi } from './PostDetailsUi';
import './PostDetails.scss';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDedails] = useState({} as Post);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isHidden, setHidden] = useState(false);
  const [initialize, setInitialize] = useState(false);

  const loadData = async () => {
    if (selectedPostId !== 0) {
      setInitialize(true);
      const [postFromServer, commentsFromServer] = await Promise.all([
        getPostDetails(selectedPostId),
        getPostComments(selectedPostId),
      ]);

      setPostDedails(postFromServer);
      setComments(commentsFromServer);
      setInitialize(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedPostId]);

  const handleVisabiliti = () => {
    setHidden(!isHidden);
  };

  const handleDelete = async (commentId: number) => {
    await deleteComment(commentId);
    loadData();
  };

  const handleAdd = async (comment: NewComment) => {
    await addComment(comment);

    loadData();
  };

  return (
    <PostDetailsUi
      isHidden={isHidden}
      comments={comments}
      initialize={initialize}
      postDetails={postDetails}
      selectedPostId={selectedPostId}
      handleAdd={handleAdd}
      handleDelete={handleDelete}
      handleVisabiliti={handleVisabiliti}
    />
  );
};
