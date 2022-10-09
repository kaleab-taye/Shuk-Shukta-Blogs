import React, { useState } from 'react';

export const blogsContext = React.createContext();
export const fullBlogsContext = React.createContext();
export const setBlogContext = React.createContext();
export default function BlogContextProvider(props) {
   
  const [blogs, setBlogs] = useState(props.blogs);
  const fullBlogs = props.blogs;
  return (
    <>
      <fullBlogsContext.Provider value={fullBlogs}>
        <setBlogContext.Provider value={setBlogs}>
          <blogsContext.Provider value={blogs}>
            {props.children}
          </blogsContext.Provider>
        </setBlogContext.Provider>
      </fullBlogsContext.Provider>
    </>
  );
}
