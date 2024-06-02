import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { getComments } from '../api/Comments';
import { Post } from '../types/Post';

type Props = {
  openedPost: Post;
  postsComments: Comment[];
  onDeleteComments: (commentId: number) => void;
  postBody: string;
  postIdComment: number;
  postTitle: string;
  setPostsComments: (value: React.SetStateAction<Comment[]>) => void;
};

export const PostDetails: React.FC<Props> = ({
  openedPost,
  postsComments,
  onDeleteComments,
  postBody,
  postIdComment,
  postTitle,
  setPostsComments,
}) => {
  const [loading, setLoading] = useState(true);
  const [writeCommentVisible, setWriteCommentVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  const loadPostComments = async (postId: number) => {
    try {
      setLoading(true);

      const comments = await getComments(postId);

      setPostsComments(comments);
      setErrorMessage(null);
    } catch (error) {
      setPostsComments([]);
      setErrorMessage('Failed to load comments.');
    } finally {
      setLoading(false);
    }
  };

  const toggleWriteComment = () => {
    setWriteCommentVisible(prevState => !prevState);
  };

  const addNewComment = (comment: Comment) => {
    setPostsComments(prevComments => [comment, ...prevComments]);
    setWriteCommentVisible(false);
  };

  useEffect(() => {
    setWriteCommentVisible(false);
  }, [openedPost]);

  useEffect(() => {
    if (openedPost && openedPost.id) {
      loadPostComments(openedPost.id);
    }
    /* eslint-disable*/
  }, [openedPost.id]);

  if (!openedPost) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${postIdComment}: ${postTitle}`}</h2>

        <p data-cy="PostBody">{postBody}</p>
      </div>

      <div className="block">
        {loading ? (
          <Loader />
        ) : (
          <>
            {errorMessage && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}
            {!postsComments.length && !errorMessage && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            <div>
              {!errorMessage && !!postsComments.length && (
                <p className="title is-4">Comments:</p>
              )}

              {postsComments.map(comment => {
                const { email, name, body, id } = comment;

                return (
                  <article
                    className="message is-small"
                    key={id}
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => onDeleteComments(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </div>

            {!writeCommentVisible && !errorMessage && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={toggleWriteComment}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {writeCommentVisible && (
        <NewCommentForm
          postId={postIdComment}
          addComment={addNewComment}
          setPostsComments={setPostsComments}
          comments={postsComments}
        />
      )}
    </div>
  );
};
