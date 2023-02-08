import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isCommentAdder, setIsCommentAdder] = useState(false);

  const commentsFromServer = async () => {
    try {
      const result: Comment[] = await client.get(`/comments?postId=${selectedPost.id}`);

      setComments(result);
      setIsLoader(false);
    } catch {
      setIsError(true);
      setIsLoader(false);
    }
  };

  const deleteButtonHandler = async (commentId: number) => {
    await client.delete(`/comments/${commentId}`);
    commentsFromServer();
  };

  useEffect(() => {
    setIsLoader(true);

    const timeout = setTimeout(() => {
      setIsCommentAdder(false);
      commentsFromServer();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedPost]);

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
          {isLoader && (<Loader />)}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(comments?.length === 0 && !isLoader && !isError) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments?.length > 0 && !isLoader) && (
            <>
              <p className="title is-4">Comments:</p>
              {comments?.map(comment => (
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
                      onClick={() => deleteButtonHandler(comment.id)}
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
          {(!isCommentAdder && !isLoader) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentAdder(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {(isCommentAdder && !isLoader) && (
          <NewCommentForm
            selectedPost={selectedPost}
            commentsFromServer={commentsFromServer}
          />
        )}
      </div>
    </div>
  );
};
