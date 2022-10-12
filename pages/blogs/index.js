import { useContext } from "react";
import Blog_List from "../../components/Blog-List";
import BlogContextProvider, { blogsContext } from "../../components/BlogContextProvider";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import NoBlogAvailable from "../../components/NoBlogAvailable";

export default function index(props) {
  return (
    <>
    <BlogContextProvider blogs={props.blogs} >
    <Nav />
     <Blog_List /> 
  </BlogContextProvider>
    <Footer/>
    </>
  )
}

export const getServerSideProps = async ()=>{

    let url = process.env.url

    try {
      
      let res = await fetch(`${url}/api/blogs`);
      let blogs = await res.json();
    
      return {
          props : {
              blogs,
          }
      };
    } catch (error) {
      console.error(error)

      return {
        props : {
            blogs : [],
            error : error
        }
    };
    }

  
  }