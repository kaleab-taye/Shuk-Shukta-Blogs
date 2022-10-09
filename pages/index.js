import React, { useContext, useState } from 'react';
import Blog_List from '../components/Blog-List';
import BlogContextProvider, { blogsContext } from '../components/BlogContextProvider';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import NoBlogAvailable from '../components/NoBlogAvailable';

export default function Home(props) {
  
let blogs =useContext( blogsContext)
  return (
    <div className="">
      <Hero />
      <BlogContextProvider blogs={props.blogs} >
        <Nav />
         <Blog_List />
      </BlogContextProvider>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  let url = process.env.url;

  let res = await fetch(`${url}/api/blogs`);
  let blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
};
