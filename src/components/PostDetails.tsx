import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post | null,
  isCommentButtonClicked: boolean,
  setIsCommentButtonClicked: (value: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isCommentButtonClicked,
  setIsCommentButtonClicked,
}) => {
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentErrorMessage, setCommentErrorMessage] = useState('');
  const [postsComments, setPostsComments] = useState<Comment[]>([]);

  const commentButtonHandler = () => {
    setIsCommentButtonClicked(true);
  };

  const getPostsComments = () => {
    return client.get<Comment[]>(`/comments?postId=${selectedPost?.id}`)
      .catch(() => {
        setCommentErrorMessage('Something went wrong!');
      });
  };

  useEffect(() => {
    setIsCommentsLoading(true);
    getPostsComments()
      .then(comentsFromServer => {
        if (comentsFromServer) {
          setPostsComments(comentsFromServer);
        }
      })
      .finally(() => setIsCommentsLoading(false));
  }, [selectedPost]);

  const removeComment = (id: number) => {
    return client.delete(`/comments/${id}`);
  };

  const deleteCommentHandler = (id: number) => {
    setIsCommentsLoading(true);
    setPostsComments(prew => prew.filter(CurentComment => (
      id !== CurentComment.id
    )));

    removeComment(id)
      .catch(() => {
        setCommentErrorMessage('delete error');
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {commentErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {postsComments.length === 0
            ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
            : <p className="title is-4">Comments:</p>}

          {!isCommentsLoading && (
            postsComments.map(comment => (
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
                    onClick={() => deleteCommentHandler(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            )))}

          {!isCommentButtonClicked && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={commentButtonHandler}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentButtonClicked && (
          <NewCommentForm
            selectedPost={selectedPost}
            setPostsComments={setPostsComments}
            setCommentErrorMessage={setCommentErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
