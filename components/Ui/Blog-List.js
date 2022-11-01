import Link from 'next/link';
import React, { useContext } from 'react';
import { blogsContext } from '../BlogContextProvider';
import HomeBlogCard from './Home-Blog-Card';
import NoBlogAvailable from '../NoBlogAvailable';
import BodyLayout from './BodyLayout';

export default function Blog_List() {
  const blogs = useContext(blogsContext);

  return (
    <>
      <BodyLayout>
        {blogs.length > 0 ? (
          <div >
            {blogs.map((blog) => {
              return (
                <>
                  <HomeBlogCard blog={blog} />
                </>
              );
            })}
          </div>
        ) : (
          <NoBlogAvailable />
        )}
      </BodyLayout>
    </>
  );
}
// <Link href={`blogs/${blog.id}`} key={blog.id}>
//               <a id={blog.id}></a>
