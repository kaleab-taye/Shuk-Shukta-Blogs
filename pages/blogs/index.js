import Blog_List from "../../components/Blog-List";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

export default function index(props) {
  return (
    <>
    <Nav/>
    <Blog_List blogs = {props.blogs}/>
    <Footer/>
    </>
  )
}

export const getStaticProps = async ()=>{

    let url = process.env.url

    let res = await fetch(`${url}/api/blogs`);
    let blogs = await res.json();
    console.log('dd', blogs)
  
    return {
        props : {
            blogs,
        }
    };
  
  }