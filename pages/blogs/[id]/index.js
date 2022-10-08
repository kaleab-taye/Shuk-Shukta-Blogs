import { useEffect } from 'react';
import BlogMetaSection from '../../../components/BlogMetaSection';
import CommentSection from '../../../components/CommentSection';

export default function Blog(props) {
  const webUrl = process.env.url;
  useEffect(() => {
    // console.log('a', localStorage.getItem(props.blog.id));
    // localStorage.removeItem(props.blog.id);
    if (localStorage.getItem(props.blog.id) === null) {
      localStorage.setItem(props.blog.id, { seen: true });
      addSeen();
    }
  }, []);

  async function addSeen() {
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});

    let response = await fetch(`${webUrl}/api/blogs/${props.blog.id}/seen`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    });

    let resp = await response.text();
  }

  return (
    <div className="max-w-contentWid m-auto my-10 xl:my-20 px-5 ">
      <div className="break-all text-4xl lg:text-5xl xl:text-6xl font-semibold font-commonFont text-accent pb-2">
        {props.blog.title}
      </div>
      <hr />
      <div className="break-all py-10 font-commonFont text-xl lg:text-2xl xl:text-3xl">
        {props.blog.body}
      </div>
      <hr />
      <BlogMetaSection blog={props.blog} />
      <hr />
      <CommentSection id={props.blog.id} comments={props.blog.comment} />
      <hr />
    </div>
  );
}

export async function getServerSideProps(context) {
  let url = process.env.url;

  let res = await fetch(`${url}/api/blogs/${context.params.id}`);
  let blog = await res.json();

  return {
    props: {
      blog,
    },
  };
}

// export async function getStaticPaths() {
//   let url = process.env.url;

//   let res = await fetch(`${url}/api/blogs`);
//   let blogs = await res.json();

//   const ids = blogs.map((blog) => blog.id);
//   const paths = ids.map((id) => ({
//     params: {
//       id: id.toString(),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }
