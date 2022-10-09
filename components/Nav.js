import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faSearch,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { blogsContext, fullBlogsContext, setBlogContext } from './BlogContextProvider';

export default function Nav() {
  const blogs = useContext(blogsContext);
  const fullBlogs = useContext(fullBlogsContext);
  const setBlogs = useContext(setBlogContext);

  const [sortBy, setSortBy] = useState('id');
  var [sorted, setSorted] = useState([]);

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
  // useEffect(() => {
  //   setSorted(fullBlogs.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)));
  //   setBlogs([]);
  // }, [sortBy]);
  // useEffect(() => {
  //   setBlogs(sorted);
  // }, [sorted]);
  // function showSortOption() {}

  return (
    <div className="sticky top-0 bg-primary border-b py-2">
      <div className="max-w-contentWid mx-auto grid grid-cols-4">
        <div className="bg-secondary col-start-1 col-end-3 mx-auto rounded-2xl">
          {/* search */}
          <div className=" py-2 px-3 flex m-auto">
            <div className="m-auto flex ">
              <input
                className="bg-secondary sm:mx-2 p-1 w-16 sm:w-40 md:w-72 lg:w-96"
                placeholder="Search"
                id="search"
                onChange={(e) => Search(e)}
              />
              <label htmlFor="search bg-green-500 flex ">
                <FontAwesomeIcon
                  className="w-6 sm:w-6 text-onSecondary grid mt-1"
                  icon={faSearch}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="m-auto">
          <div className="flex">
            <select
            onChange={(e)=>setSortBy(e.target.value)}
              id="sort"
              className="m-2 w-0 sm:w-auto p-1 bg-primary appearance-none overflow-hidden"
            >
              <option value="date" selected disabled></option>
              <option value="date" default>title</option>
              <option value="date">date</option>
              <option value="upVote">up votes</option>
              <option value="seen">audience</option>
            </select>
            <label htmlFor="sort">
              <FontAwesomeIcon
                className="w-6 sm:w-6 text-onSecondary"
                icon={faSort}
                // onClick={() => showSortOption()}
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
