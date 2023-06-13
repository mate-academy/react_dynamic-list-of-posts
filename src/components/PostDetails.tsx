import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePostsContext } from '../Context/PostsContext';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const {
    loadingPost, postError, comments, chosenPost, posts,
    handleDeleteComment, isWriteComment, setIsWriteComment,
  } = usePostsContext();

  const [tempComments, setTempComments] = useState<Comment[]>([]);

  const isCommets = !comments.length;
  const postTitle = posts?.filter(post => post.id === chosenPost)
    .find(post => post.title);
  const postBody = posts?.filter(post => post.id === chosenPost)
    .find(post => post.body);

  function deletingComment(id: number) {
    const temp = comments.filter(comment => comment.id !== id);

    setTempComments(prevState => prevState.concat(temp));
  }

  const handleDelete = (id: number) => {
    handleDeleteComment(id);
    deletingComment(id);
  };

  const showComments = tempComments.length
    ? tempComments
    : comments;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${chosenPost}: ${postTitle?.title}`}
          </h2>

          <p data-cy="PostBody">
            {postBody?.body}
          </p>
        </div>

        <div className="block">
          {loadingPost && <Loader />}

          {postError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isCommets && !loadingPost && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!isCommets && !loadingPost && (
            <>
              <p className="title is-4">Comments:</p>
              {showComments.map(comment => {
                const {
                  email, name, body, id,
                } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${email}`}
                        data-cy="CommentAuthor"
                      >
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDelete(id)}
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
            </>
          )}

          {!isWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriteComment(!isWriteComment)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteComment && <NewCommentForm />}
      </div>
    </div>
  );
};
