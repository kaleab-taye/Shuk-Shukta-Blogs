import Link from 'next/link';
import React, { useContext } from 'react';
import { blogsContext } from './BlogContextProvider';
import HomeBlogCard from './Home-Blog-Card';
import NoBlogAvailable from './NoBlogAvailable';

export default function Blog_List() {
  const blogs = useContext(blogsContext);

  return (
    <>
    {blogs.length > 0 ?  
      <div className=" max-w-contentWid m-auto">
        {blogs.map((blog) => {
          return (
            <Link href={`blogs/${blog.id}`} key={blog.id}>
              <a id={blog.id}>
                <HomeBlogCard blog={blog} />
              </a>
            </Link>
          );
        })}
      </div>
    : <NoBlogAvailable /> }
    </>
  );
}
