import { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { PostDetailsUI } from '../PostDetailsUI';
import { NewCommentForm } from '../NewCommentForm';
import { getSelectedPost } from '../../api/posts';
import { getPostComments, postComment, deletePostComment } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [isCommentsShow, setIsCommentsShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function loadPostDetails() {
    setIsLoading(true);

    const postFromServer = await getSelectedPost(selectedPostId);

    setSelectedPost(postFromServer);

    setIsLoading(false);
  }

  async function loadComments() {
    setIsLoading(true);
    const commentsFromServer = await getPostComments(selectedPostId);

    setPostComments(commentsFromServer);
    setIsLoading(false);
  }

  const postNewComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    setIsLoading(true);
    if (selectedPost) {
      await postComment({
        postId: selectedPost.id,
        name,
        email,
        body,
      });
    }

    await loadComments();
    setIsLoading(false);
  };

  const deleteComment = async (commentId: number) => {
    setIsLoading(true);
    await deletePostComment(commentId);

    await loadComments();
    setIsLoading(false);
  };

  const changeShowComments = () => {
    setIsCommentsShow(current => !current);
  };

  useEffect(() => {
    loadPostDetails();
    loadComments();
  }, [selectedPostId]);

  if (!isLoading && selectedPost) {
    return (
      <div className="PostDetails">
        <h2>Post details:</h2>
        <PostDetailsUI
          selectedPost={selectedPost}
          postComments={postComments}
          onDeleteComment={deleteComment}
          isCommentsShow={isCommentsShow}
          onchangeShowComments={changeShowComments}
        />
        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm onPostNewComment={postNewComment} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <Loader />
  );
};
