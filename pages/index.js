import Blog_List from '../components/Blog-List';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Nav from '../components/Nav';
import NoBlogAvailable from '../components/NoBlogAvailable';

export default function Home(props) {
  return (
    <div className="">
      <Hero />
      <Nav />
      {props.blogs.length > 0 ? (
        <Blog_List blogs={props.blogs} />
      ) : (
        <NoBlogAvailable />
      )}

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
