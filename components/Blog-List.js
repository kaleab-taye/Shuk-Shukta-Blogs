import Link from "next/link";
import HomeBlogCard from "./Home-Blog-Card";

export default function Blog_List(props) {
    
  return (
    <div className=" max-w-contentWid m-auto">
        {props.blogs.map((blog) => {
          return (
            <Link href={`blogs/${blog.id}`} key={blog.id}>
              <a>
                <HomeBlogCard blog={blog} />
              </a>
            </Link>
          );
        })}
      </div>
  );
}


