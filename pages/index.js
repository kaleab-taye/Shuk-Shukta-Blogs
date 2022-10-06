import Blog_List from '../components/Blog-List';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Nav from '../components/Nav';

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

export const getServerSideProps = async ()=>{

  let url = process.env.url

  let res = await fetch(`${url}/api/blogs`);
  let blogs = await res.json();

  return {
      props : {
          blogs,
      }
  };

}