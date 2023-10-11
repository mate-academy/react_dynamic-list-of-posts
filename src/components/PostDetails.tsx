import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, getComments, getPost } from './Api';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  selectedPostId: number | undefined
  isError: boolean
  setIsError: (a: boolean) => void
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
  isError,
  setIsError,
}) => {
  const [post, setPosts] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetComments = () => {
    setIsLoading(true);
    getComments(selectedPostId)
      .then(data => {
        const commentsArr = data as Comment[];

        setIsLoading(false);
        setComments(commentsArr);
      });
  };

  const deleteSelectComment = (id: number | undefined) => {
    if (id) {
      deleteComment(id);
      setComments((prevComments: Comment[]) => prevComments.filter(
        comment => comment.id !== id,
      ));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (selectedPostId) {
      getPost(selectedPostId)
        .then(data => {
          const postData = data as Post;

          setPosts(postData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });

      handleGetComments();
    }
  }, [selectedPostId, setComments]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        {post ? (
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPostId}: ${post.title}`}
            </h2>
            <p data-cy="PostBody">{post.body}</p>
          </div>
        ) : null}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => {
                  const {
                    email,
                    name,
                    body,
                    id,
                  } = comment;

                  return (
                    <article
                      className="message is-small"
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
                          onClick={() => deleteSelectComment(id)}
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
          </>
        )}

        {!isLoading && !isOpen ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsOpen(true)}
          >
            Write a comment
          </button>
        ) : null}

        {isOpen && (
          <NewCommentForm
            setComments={setComments}
            selectedPostId={selectedPostId}
            key={selectedPostId}
          />
        )}
      </div>
    </div>
  );
};
