import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  selectedPost: Post | null;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  handleDeleteComment: (id: number) => Promise<void>;
  loadingComments: boolean;
  createComment: (
    userName: string,
    title: string,
    userEmail: string,
  ) => Promise<void>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  showForm,
  setShowForm,
  comments,
  setComments,
  handleDeleteComment,
  loadingComments,
  createComment,
  isError,
  setIsError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await client.get<Comment[]>(
          '/comments?postId=' + selectedPost?.id,
        );

        setComments(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedPost) {
      fetchData();
    }
  }, [selectedPost, setComments, setIsError]);

  if (!selectedPost) {
    return;
  }

  const { id, title, body } = selectedPost;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {!isError && isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && (!comments || comments.length === 0) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !isError && comments && comments.length > 0 && (
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
            </>
          )}

          {!showForm && !isLoading && !isError && (
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
            loadingComments={loadingComments}
            createComment={createComment}
          />
        )}
      </div>
    </div>
  );
};
