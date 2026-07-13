import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  posts: Post[];
  activePostId: number | null;
  comments: Comment[];
  isCommentError: boolean;
  isCommentLoading: boolean;
  isFormOpen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  onCommentAdded: (comment: Comment) => void;
  onCommentDeleted: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  posts,
  activePostId,
  comments,
  isCommentError,
  isCommentLoading,
  isFormOpen,
  setIsFormOpen,
  onCommentAdded,
  onCommentDeleted,
}) => {
  const [selectedPost, setSelectedPost] = useState<Post>();

  useEffect(() => {
    const postInfo = posts.find(post => post.id === activePostId);

    setSelectedPost(postInfo);
  }, [activePostId, posts]);

  const handleFormOpen = () => {
    setIsFormOpen(prevIsFormOpen => !prevIsFormOpen);
  };

  const handleDeleteComment = (id: number) => {
    client.delete(`/comments/${id}`);
    onCommentDeleted(id);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isCommentLoading ? (
            <Loader />
          ) : isCommentError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : comments.length === 0 ? (
            <>
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
              {!isFormOpen && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleFormOpen}
                >
                  Write a comment
                </button>
              )}
            </>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {!isFormOpen && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleFormOpen}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isFormOpen && (
          <NewCommentForm
            postId={activePostId}
            onCommentAdded={onCommentAdded}
          />
        )}
      </div>
    </div>
  );
};
