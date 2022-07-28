import React, { useEffect, useState } from 'react';
import {
  deletePostComent,
  getPostComments,
  setPostComent,
} from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hiddenComments, setHidenComments] = useState<Comment[]>([]);

  const [loadingError, setLoadingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(0);
  const [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const commentsFromServer = await getPostComments(post.id);

        setComments(commentsFromServer);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setLoadingError(true);
      }
    })();
  }, [hasUpdate]);

  useEffect(() => {
    if (subscribe) {
      (async () => {
        try {
          const commentsFromServer = await getPostComments(post.id);

          setComments(commentsFromServer);
        } catch (error) {
          setLoadingError(true);
        }
      })();
    }

    const unsubscribe = () => {
      if (post.id) {
        setSubscribe(true);
      }
    };

    return unsubscribe;
  }, [comments]);

  const setNewComment = (
    body: string,
    name: string,
    email: string,
  ) => {
    setHasUpdate(hasUpdate + 1);
    setPostComent({
      postId: post.id,
      name,
      email,
      body,
    });
  };

  const coverComments = (commentId = 0) => {
    setHasUpdate(hasUpdate + 1);
    const deletedComment = comments.find(comm => comm.id === commentId);

    if (deletedComment) {
      setHidenComments([...hiddenComments, deletedComment]);
    }

    deletePostComent(commentId);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="PostDetails__show-button button"
          onClick={() => {
            hiddenComments.forEach(comment => {
              setPostComent({
                name: comment.name,
                email: comment.email,
                body: comment.body,
                postId: comment.postId,
              });
            });
            setHidenComments([]);
          }}
        >
          {`Hide ${hiddenComments.length} comments`}
        </button>

        {loading ? <Loader /> : (
          <>
            {comments.length > 0 && (
              comments.map(comment => (
                <ul className="PostDetails__list" key={comment.id}>
                  <li className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => coverComments(comment.id)}
                    >
                      X
                    </button>
                    <div className="block">
                      <p>
                        {comment.body}
                      </p>
                      <h4>{comment.name}</h4>
                      <a
                        // eslint-disable-next-line max-len
                        href="https://mail.google.com/mail/u/0/?pli=1#inbox?compose=XBcJlHhnzTHQRxctwSqKTQLTKwWtFJTzqdbSnhTdSNrwQCVjrFvMvWjtXrbDSSFSpTZMVRmxxlMbSJkv"
                        className="PostDetails__link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {comment.email}
                      </a>
                    </div>
                  </li>
                </ul>
              ))
            )}
          </>
        )}
      </section>

      {loadingError && (
        <div className="columns is-centered">
          <div className="column">
            <p className="subtitle">
              Sorry, we can`t load data from this api
            </p>
          </div>
        </div>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onAdd={setNewComment} />
        </div>
      </section>
    </div>
  );
};
