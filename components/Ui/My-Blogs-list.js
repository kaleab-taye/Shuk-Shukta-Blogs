import Link from 'next/link';
import React, { useContext } from 'react';
import { blogsContext } from '../BlogContextProvider';
import HomeBlogCard from './Home-Blog-Card';
import NoBlogAvailable from '../NoBlogAvailable';
import BodyLayout from './BodyLayout';
import MyBlogCard from './My-Blog-Card';

export default function My_Blog_List(props) {
  const blogs = useContext(blogsContext);

  return (
    <>
      <BodyLayout>
        {blogs.length > 0 ? (
          <div >
            {blogs.map((blog) => {
              return (
                <>
                  <MyBlogCard userId={props.userId} token={props.token} blog={blog} />
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