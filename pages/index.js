import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Blog_List from '../components/Blog-List';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HomeBlogCard from '../components/Home-Blog-Card';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  
  return (
    <div className="">
      <Hero />
      <Nav />
      <Blog_List blogs={props.blogs}/>
      <Footer />
    </div>
  );
}

export const getStaticProps = async ()=>{

  let url = process.env.url

  let res = await fetch(`${url}/api/blogs`);
  let blogs = await res.json();

  return {
      props : {
          blogs,
      }
  };

}