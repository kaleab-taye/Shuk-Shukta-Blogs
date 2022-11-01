import { useContext } from "react";
import BlogContextProvider, { blogsContext } from "../../components/BlogContextProvider";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import NoBlogAvailable from "../../components/NoBlogAvailable";
import Blog_List from "../../components/Ui/Blog-List";

export default function index(props) {
  return (
    <div className="">
      <BlogContextProvider blogs={props.blogs}>
        <Nav />
        <Blog_List />
      </BlogContextProvider>
      {/* <Footer /> */}
    </div>
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