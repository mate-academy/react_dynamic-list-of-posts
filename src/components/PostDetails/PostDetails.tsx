import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
  const [hidenComments, setHideComments] = useState<Comment[]>([]);

  const [loadingError, setLoadingError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const commentsFromServer = await getPostComments(post.id);

        setVisibleComments(commentsFromServer);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setLoadingError(true);
      }
    })();
  }, [post.id]);

  const getNewCommentsId = () => {
    const maxValue = visibleComments
      .map(comm => comm.id)
      .sort((a, b) => a - b)[visibleComments.length - 1];

    return maxValue;
  };

  const setNewComment = (
    comentBody: string,
    name: string,
    email: string,
  ) => {
    setVisibleComments([
      ...visibleComments,
      {
        name,
        email,
        id: getNewCommentsId() + 1,
        body: comentBody,
      },
    ]);
  };

  const coverComments = (currentComment: Comment) => {
    setVisibleComments(
      visibleComments
        .filter(visComment => visComment.id !== currentComment.id),
    );
    setHideComments([
      ...hidenComments,
      currentComment,
    ]);
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
            setVisibleComments([
              ...visibleComments,
              ...hidenComments,
            ]);
            setHideComments([]);
          }}
        >
          {`Hide ${hidenComments.length} comments`}
        </button>

        {loading ? <Loader /> : (
          <>
            {visibleComments.length > 0 && (
              visibleComments.map(comment => (
                <ul className="PostDetails__list" key={comment.id}>
                  <li className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => coverComments(comment)}
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
