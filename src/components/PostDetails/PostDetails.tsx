import React, { useEffect, useState } from 'react';
import { client } from '../../utils/fetchClient';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { CommentItem } from '../CommentItem';

type Props = {
  selectedPost: Post | null;
};
export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setIsCommentFormOpen(false);
    setIsLoadingComments(true);
    setHasCommentsError(false);
    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(commentsFromServ => {
        setComments(commentsFromServ);
      })
      .catch(() => {
        setHasCommentsError(true);
      })
      .finally(() => {
        setIsLoadingComments(false);
      });
  }, [selectedPost]);

  const handleDeleteComment = (commentPost: Comment) => {
    const prevCom = comments;

    setHasCommentsError(false);
    setComments(prevComments =>
      prevComments.filter(com => com.id !== commentPost.id),
    );
    client.delete(`/comments/${commentPost.id}`).catch(() => {
      setHasCommentsError(true);
      setComments(prevCom);
    });
  };

  const handleOpenForm = () => {
    setIsCommentFormOpen(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoadingComments && <Loader />}

        {!isLoadingComments && hasCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !hasCommentsError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDeleteComment={handleDeleteComment}
              />
            ))}
          </>
        )}

        {!isLoadingComments && !hasCommentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!isLoadingComments && !hasCommentsError && !isCommentFormOpen && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleOpenForm}
          >
            Write a comment
          </button>
        )}
      </div>

      {isCommentFormOpen && selectedPost && (
        <NewCommentForm selectedPost={selectedPost} setComments={setComments} />
      )}
    </div>
  );
};
