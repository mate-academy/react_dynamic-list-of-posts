/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { getComment, getPostId } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import { forComment, Post } from '../../react-app-env';
import './PostDetails.scss';

type Props = {
  selectedId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedId } = props;
  const [comments, setComments] = useState<forComment[] | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const commentFromApi = await getComment(selectedId);

      return setComments(commentFromApi);
    })();

    (async () => {
      const postFromApi = await getPostId(selectedId);

      return setPost(postFromApi);
    })();
  }, [selectedId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      {selectedId !== -1
        ? (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setVisible(!visible)}
            >
              {`${visible ? 'Hide' : 'Show'} comments`}
            </button>

            {visible ? (
              <ul className="PostDetails__list">
                {comments && comments.length > 0
                  ? comments.map((comment) => (
                    <li className="PostDetails__list-item" key={comment.id}>
                      {comment.body.length > 0
                        ? (
                          <>
                            <button
                              type="button"
                              className="PostDetails__remove-button button"
                              onClick={() => {
                                const newArr = comments.filter(
                                  (filterComment) => filterComment.id !== comment.id,
                                );

                                setComments(newArr);
                              }}
                            >
                              X
                            </button>
                            <p>
                              {comment.body}
                            </p>
                          </>
                        )
                        : ''}
                    </li>
                  ))
                  : ''}
              </ul>
            )
              : ''}
          </section>
        )
        : ''}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm comments={comments} setComments={setComments} selectedId={selectedId} />
        </div>
      </section>
    </div>
  );
};
