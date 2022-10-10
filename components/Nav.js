import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faSearch,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import {
  blogsContext,
  fullBlogsContext,
  setBlogContext,
} from './BlogContextProvider';

export default function Nav() {
  const blogs = useContext(blogsContext);
  const fullBlogs = useContext(fullBlogsContext);
  const setBlogs = useContext(setBlogContext);

  const [sortBy, setSortBy] = useState('id');

  function Search(searchWord) {
    let result = [];
    fullBlogs.forEach((singleData) => {
      if (
        JSON.stringify(singleData)
          .toLowerCase()
          .includes(searchWord.target.value?.toString().toLowerCase())
      ) {
        result.push(singleData);
      }
    });
    setBlogs(result);
  }
  useEffect(() => {
    setBlogs([]);
    if (
      sortBy === 'id' ||
      sortBy === 'title' ||
      sortBy === 'author' ||
      sortBy === 'body'
    ) {
      let blogList = fullBlogs.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
      setBlogs([...blogList]);
    } else if (
      sortBy === 'seen' ||
      sortBy === 'upVote' ||
      sortBy === 'downVote' ||
      sortBy === 'date'
    ) {
      var blogList = fullBlogs.sort((a, b) =>
        a.blogMeta[sortBy] > b.blogMeta[sortBy] ? -1 : 1
      );
      setBlogs([...blogList]);
    } else {
      setBlogs(fullBlogs);
    }
  }, [sortBy,  fullBlogs]);
  // function showSortOption() {}

  return (
    <div className="sticky top-0 bg-primary border-b py-2">
      <div className="max-w-contentWid mx-auto grid grid-cols-4">
        <div className="bg-secondary col-start-1 col-end-3 mx-auto rounded-2xl">
          {/* search */}
          <div className="py-2 px-3 flex m-auto">
            <div className="m-auto flex ">
              <input
                className="bg-secondary sm:mx-2 p-1 w-16 sm:w-40 md:w-72 lg:w-96"
                placeholder="Search"
                id="search"
                onChange={(e) => Search(e)}
              />
              <label htmlFor="search">
                <FontAwesomeIcon
                  className="w-6 sm:w-6 text-onSecondary grid mt-1"
                  icon={faSearch}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="m-auto">
          {/* sort */}
          <div className="flex">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              id="sort"
              placeholder="sortby"
              className="text-lg font-normal text-onSecondary form-select gap-5 rounded m-2 w-0 sm:w-auto p-1 bg-primary appearance-none overflow-hidden"
              defaultValue={'id'}
            >
              <option value="id" disabled>
                sort by
              </option>
              <option value="title">Title</option>
              <option value="date">Date</option>
              <option value="upVote">Up votes</option>
              <option value="seen">Audience</option>
            </select>
            <label htmlFor="sort" className="text-center m-auto">
              <FontAwesomeIcon
                className="w-6 sm:w-6 m-auto flex text-onSecondary"
                icon={faSort}
              />
            </label>
          </div>
        </div>
        <div className="m-auto flex">
          <Link href="/blogs/new">
            <FontAwesomeIcon
              className="w-8 sm:w-8 text-onSecondary"
              icon={faCirclePlus}
            />
          </Link>
          {/*           <div className='m-auto px-2 font-bold font-commonFont tracking-wide text-2xl'>New</div>
           */}
        </div>
      </div>
    </div>
  );
}
