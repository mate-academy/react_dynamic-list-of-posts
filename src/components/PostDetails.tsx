import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentListElement } from './CommentListElement';

type Props = {
  postSelected: Post;
  commentsForPost: Comment[];
  PostDetailsLoading?: boolean;
  setCommentsForPost: React.Dispatch<React.SetStateAction<Comment[]>>;
  showError?: boolean;
};

export const PostDetails: React.FC<Props> = ({
  postSelected,
  PostDetailsLoading,
  commentsForPost,
  setCommentsForPost,
  showError,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(false);
  }, [postSelected]);

  const renderComments = () => {
    if (showError) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    if (PostDetailsLoading) {
      return <Loader />;
    }

    if (commentsForPost.length > 0) {
      return commentsForPost.map((comment) => (
        <CommentListElement
          key={comment.id}
          comment={comment}
          setCommentsFromServer={setCommentsForPost}
        />
      ));
    }

    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${postSelected.id}:`} {postSelected.title}
        </h2>
        <p data-cy="PostBody">{postSelected.body}</p>
      </div>

      <div className="block">
        <p className="title is-4">Comments:</p>
        {renderComments()}

        {!showForm && !PostDetailsLoading && !showError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && (
        <NewCommentForm
          postSelected={postSelected}
          setCommentsFromServer={setCommentsForPost}
        />
      )}
    </div>
  );
};
