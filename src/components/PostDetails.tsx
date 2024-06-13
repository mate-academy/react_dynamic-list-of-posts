/* eslint-disable prettier/prettier */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getDelate } from '../utils/servicesPost';

type Props = {
  comments: Comment[] | null;
  post: Post;
  errorComments: boolean;
  loadingComments: boolean;
  setOpenCommentForm: Dispatch<SetStateAction<boolean>>;
  openCommentForm: boolean;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  post,
  errorComments,
  loadingComments,
  setOpenCommentForm,
  openCommentForm,
}) => {
  const [currentComments, setCurrentComments] = useState<Comment[]>([]);


  useEffect(() => {
    if (comments) {
      setCurrentComments(
        comments.filter(comment => comment.postId === post.id),
      );
    }
  }, [comments, post.id]);

  const delateComment = (commentId: number) => {
    setCurrentComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    getDelate(commentId).then(result => {
      setCurrentComments(prevComments =>
        prevComments.filter(comment => comment.id !== result),
      );
    });
  };

  const handlerOpenPostForm = () => {
    setOpenCommentForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body ? post.body : post.title}</p>
      </div>

      <div className="block">
        {loadingComments && <Loader />}

        {errorComments && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loadingComments &&
          !currentComments.length &&
          !errorComments && (
          // eslint-disable-next-line prettier/prettier
          <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
          </p>
        )}
        {currentComments.length && (
          <p className="title is-4">Comments:</p>
        )}
        {currentComments?.map(message => (
          <article
            key={message.id}
            className="message is-small"
            data-cy="Comment"
          >
            <div className="message-header">
              <a href={`mailto:${message.email}`} data-cy="CommentAuthor">
                {message.name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
                onClick={() => delateComment(message.id)}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {message.body}
            </div>
          </article>
        ))}

        {!openCommentForm && !loadingComments && !errorComments && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handlerOpenPostForm}
          >
            Write a comment
          </button>
        )}
      </div>
      {openCommentForm && (
        <NewCommentForm
          setCurrentComments={setCurrentComments}
          postId={post.id}
        />
      )}
    </div>
  );
};
