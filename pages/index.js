import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import BlogContextProvider, {
  blogsContext,
} from '../components/BlogContextProvider';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import Blog_List from '../components/Ui/Blog-List';
import imageBackground from '../public/layered-waves-haikei.svg';

export default function Home(props) {
  let blogs = useContext(blogsContext);
  return (
    <div className="">
      <Hero />
      <BlogContextProvider blogs={props.blogs}>
        <Nav />
        <Blog_List />
      </BlogContextProvider>
      {/* <Footer /> */}
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    let url = process.env.url;

    let res = await fetch(`${url}/api/blogs`);
    let blogs = await res.json();

    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        blogs: [],
        error: error,
      },
    };
  }
};
