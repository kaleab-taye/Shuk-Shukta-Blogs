import Link from 'next/link';
import Nav from '../../components/Nav';
import Blogger_Card from '../../components/Ui/Blogger-Card';
import Bloggers_List from '../../components/Ui/Bloggers-List';

export default function index(props) {
  return (
    <div className="">
        <Nav contentType={'notSearchable'}/>
        <Bloggers_List bloggers={props.bloggers} />
    </div>
  );
}
export const getServerSideProps = async () => {
  // export const getStaticProps = async () => {
  let url = process.env.url;
  try {
    let res = await fetch(`${url}/api/bloggers`);
    let bloggers = await res.json();
    return {
      props: {
        bloggers,
      },
      // revalidate: 1,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        bloggers: [],
        error: error,
      },
    };
  }
};
// <div className="m-auto max-w-contentWid">
//       <div className="text-4xl ">bloggers</div>
//       {props.bloggers.map((blogger) => (
//         <Link key={blogger.id} href={`/bloggers/${blogger.id}`}>
//           <div className="m-8">
//             <Blogger_Card blogger={blogger} />
//             <div>username : {blogger.userName}</div>
//             <div>firstName :{blogger.firstName}</div>
//             <div>lastName : {blogger.lastName}</div>
//             <div>no of blogs : {blogger.blogs.length}</div>
//           </div>
//         </Link>
//       ))}
//     </div>