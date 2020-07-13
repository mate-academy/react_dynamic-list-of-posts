import React, { useState } from 'react';
import { ButtonLoading } from './ButtonLoading';
import { PreparedPostsInterface } from './interfaces';
import { PostsList } from './PostsList';

export const DynamicPostsApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [postsList, setPostsList] = useState<PreparedPostsInterface[]>([]);
  const [filteredList, setFilteredList] = useState<PreparedPostsInterface[]>([]);
  const handleSetIsLoading = (state: string, list: PreparedPostsInterface[]) => {
    if (state === 'isLoadingNow') {
      setIsLoading(true);
    } else {
      setIsFetched(true);
      setIsLoading(false);
      setPostsList(list);
      setFilteredList(list);
    }
  };

  const filterPosts = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setInputValue(value);
    const filtered = postsList.filter(post => post.title.includes(value)
    || post.body.includes(value));

    setFilteredList(filtered);
  };

  return (
    <>
      {
        !isLoading && !isFetched
          ? <ButtonLoading handleSetIsLoading={handleSetIsLoading} />
          : <></>
      }
      {
        isLoading && !isFetched
          ? <p className="ml mail">Loading ...</p>
          : <></>
      }
      {
        !isLoading && isFetched
          ? (
            <>
              <div className="input-field col s12">
                <input
                  className="input validate"
                  id="text"
                  placeholder="Search"
                  type="text"
                  value={inputValue}
                  onChange={filterPosts}
                />
              </div>

              <PostsList posts={filteredList} />
            </>
          )
          : <></>
      }
    </>
  );
};
