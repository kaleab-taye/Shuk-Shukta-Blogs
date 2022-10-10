import { useEffect, useState } from 'react';
import BlogMetaSection from '../../../components/BlogMetaSection';
import CommentSection from '../../../components/CommentSection';
import Header from '../../../components/Header';
import PageHeading from '../../../components/PageHeading';

export default function Blog(props) {
  const webUrl = process.env.url;

  useEffect(() => {
    // console.log('a', localStorage.getItem(props.blog.id));
    // localStorage.removeItem(props.blog.id);
    if (localStorage.getItem(props.blog.id) === null) {
      localStorage.setItem(props.blog.id, JSON.stringify({ seen: true }));
      addSeen();
    }
  }, []);

  async function addSeen() {
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});

    try {
      let response = await fetch(`${webUrl}/api/blogs/${props.blog.id}/seen`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      let resp = await response.text();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header title={props.blog.title} description={props.blog.body} />
      <div className="max-w-contentWid m-auto my-10 xl:my-20 px-5 ">
        <div className="break-words  text-4xl lg:text-5xl font-semibold font-commonFont text-accent pb-2">
          <PageHeading
            className=""
            heading={props.blog.title}
            backTo={`/#${props.blog.id}`}
          />
        </div>
        <hr />
        <div
          style={{ whiteSpace: 'pre-wrap' }}
          className="text-justify break-words py-10 font-commonFont text-xl lg:text-2xl "
        >
          {props.blog.body}
        </div>
        <hr />
        <BlogMetaSection blog={props.blog} />
        <hr />
        <CommentSection id={props.blog.id} comments={props.blog.comment} />
        <hr />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let url = process.env.url;
  try {
    let res = await fetch(`${url}/api/blogs/${context.params.id}`);
    var blog = await res.json();
    if (res.status !== 200) {
      throw res;
    }
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

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
