import Blog_List from "../../components/Blog-List";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import NoBlogAvailable from "../../components/NoBlogAvailable";

export default function index(props) {
  return (
    <>
    <Nav/>
    {props.blogs.length > 0 ? (
      <Blog_List blogs={props.blogs} />
    ) : (
      <NoBlogAvailable />
    )}
    <Footer/>
    </>
  )
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