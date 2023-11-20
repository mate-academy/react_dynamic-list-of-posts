import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import CommentItem from './CommentItem';

interface Props {
  selectedPost: Post
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const commentDeleteHandler = useCallback((comment) => {
    setComments(comms => comms.filter(com => com.id !== comment.id));
    client.delete(`/comments/${comment.id}`);
  }, []);

  useEffect(() => {
    setIsCommentsLoading(true);
    setHasCommentsError(false);

    client.get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(comms => setComments(comms))
      .catch(() => setHasCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
  }, [selectedPost]);

  const renderCommentsBlock = () => {
    if (isCommentsLoading) {
      return (
        <Loader />
      );
    }

    if (hasCommentsError) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    if (!comments.length) {
      return (
        <>
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>

          {!isFormVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </>
      );
    }

    return (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onCommentDelete={() => commentDeleteHandler(comment)}
          />
        ))}

        {!isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </>
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {renderCommentsBlock()}
        </div>

        {isFormVisible && (
          <NewCommentForm
            onCommentAdd={(value) => setComments(value)}
            currentPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
