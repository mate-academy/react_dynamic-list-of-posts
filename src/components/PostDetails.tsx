import React, { useState, useCallback, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';

import { getComments } from '../api/comments';
import { Post } from '../types/Post';

type Props = {
  selectedUserPost: Post,
  selectedUserPostId: number,
  isLoadingComments: boolean,
  setIsLoadingComments: (load: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedUserPost,
  selectedUserPostId,
  isLoadingComments,
  setIsLoadingComments,
}) => {
  const [userComments, setUserComments] = useState<Comment[] | []>([]);
  const [writeComment, setWriteComment] = useState(false);
  const [addComment, setAddComment] = useState(false);

  const loadUserCommentsFromServer = useCallback(
    async () => {
      try {
        const commentsFromServer = await getComments();
        const filteredComments = commentsFromServer.filter(
          comment => comment.postId === selectedUserPostId,
        );

        setUserComments(filteredComments);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      } finally {
        setIsLoadingComments(false);
      }
    }, [selectedUserPostId],
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingComments(false);
    }, 500);
  }, [userComments]);

  useEffect(() => {
    loadUserCommentsFromServer();
    setAddComment(false);
  }, [selectedUserPostId, addComment]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedUserPost.id}: ${selectedUserPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedUserPost.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments
            ? <Loader />
            : (
              <>
                {/* <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div> */}
                {userComments.length === 0
                  ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments:</p>

                      {userComments.map(comment => (
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
              </>
            )}

          {!writeComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeComment && (
          <NewCommentForm
            selectedUserPostId={selectedUserPostId}
            setAddComment={setAddComment}
          />
        )}
      </div>
    </div>
  );
};
