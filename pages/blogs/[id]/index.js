import BlogMetaSection from '../../../components/BlogMetaSection';
import CommentSection from '../../../components/CommentSection';

export default function blog(props) {
  return (
    <div className="max-w-contentWid m-auto my-10 xl:my-20 px-5">
      <div className="text-4xl lg:text-5xl xl:text-6xl font-semibold font-commonFont text-accent pb-2">
        {props.blog.title}
      </div>
      <hr />
      <div className="py-10 font-commonFont text-xl lg:text-2xl xl:text-3xl">
        {props.blog.body}
      </div>
      <hr />
      <BlogMetaSection blog={props.blog} />
      <hr />
      <CommentSection comments={props.blog.comment} />
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
