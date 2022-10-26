import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { getPostById } from '../api/posts';
import { CommentsList } from './CommentsList';

interface Props {
  selectedPost: number | null,
  selectedUser: number | null
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  selectedUser,
}) => {
  const [displayForm, setDisplayForm] = useState(false);
  const {
    data: post,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(['post', selectedPost], () => getPostById(selectedPost!), {
    enabled: !!selectedPost,
    refetchOnMount: true,
  });

  useEffect(() => {
    return setDisplayForm(false);
  }, [selectedPost, selectedUser]);

  const handleFormDisplay = () => setDisplayForm(prevState => !prevState);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {isLoading && <Loader />}
        {isError && <div>Error</div>}
        {post && (
          <div className="block">
            <h2 data-cy="PostTitle">
              {post.title}
            </h2>

            <p data-cy="PostBody">
              {post.body}
            </p>
          </div>
        )}

        <CommentsList
          isSuccess={isSuccess}
          selectedPost={selectedPost}
          handleFormDisplay={handleFormDisplay}
          displayForm={displayForm}
        />

        {displayForm && post && <NewCommentForm postId={post.id} />}
      </div>
    </div>
  );
};
