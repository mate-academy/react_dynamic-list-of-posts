import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as listPostServices from '../services/getCommentsByPostId';
import { Comment } from '../types/Comment';

type Props = {
  post: Post | null,
  setOpenedCommentForm: (op: boolean) => void,
  openedCommentForm: boolean,
};

export const PostDetails: React.FC<Props> = ({
  post,
  setOpenedCommentForm = () => {},
  openedCommentForm,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  const [naMe, setNaMe] = useState('');
  const [emAil, setEmAil] = useState('');
  const [bOdy, setBOdy] = useState('');

  useEffect(() => {
    if (post?.id) {
      setErrorMessage('');

      setLoadingComments(true);
      listPostServices.getComments(post.id)
        .then((cOmments: Comment[]) => {
          setComments(cOmments);
        })
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoadingComments(false));
    }
  }, [post?.id]);

  const addComment = ({
    postId,
    name,
    email,
    body,
  }: Comment) => {
    setErrorMessage('');

    return listPostServices.addNewComment({
      postId,
      name,
      email,
      body,
    })
      .then((newComment) => {
        setComments(currentComments => {
          return [...currentComments, newComment];
        });
        setBOdy('');
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
  };

  const removeComment = (commentId: number) => {
    setComments(currentComments => currentComments.filter(
      (comm) => comm.id !== commentId,
    ));

    return listPostServices.deleteComment(commentId)
      .catch((error) => {
        setComments(currentComments => currentComments.filter(
          (comm) => comm.id !== commentId,
        ));
        throw error;
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {
            loadingComments && (
              <Loader />
            )
          }

          {
            errorMessage && (
              <div className="notification is-danger" data-cy="CommentsError">
                {errorMessage}
              </div>
            )
          }

          {
            !errorMessage
            && !loadingComments
            && (
              <>
                {
                  !!comments.length && (
                    <p className="title is-4">Comments:</p>
                  )
                }
                {
                  comments.length > 0 ? (
                    comments.map((comment) => (
                      <article className="message is-small" data-cy="Comment">
                        <div className="message-header">
                          <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                            {comment.name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => removeComment(comment.id)}
                          >
                            delete button
                          </button>
                        </div>
                        <div className="message-body" data-cy="CommentBody">
                          {comment.body}
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  )
                }

                {
                  !openedCommentForm && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => setOpenedCommentForm(true)}
                    >
                      Write a comment
                    </button>
                  )
                }
              </>
            )
          }
        </div>

        {
          openedCommentForm && !errorMessage && (
            <NewCommentForm
              onAddComment={addComment}
              name={naMe}
              email={emAil}
              body={bOdy}
              setName={setNaMe}
              setEmail={setEmAil}
              setBody={setBOdy}
              postId={post?.id}
            />
          )
        }
      </div>
    </div>
  );
};
