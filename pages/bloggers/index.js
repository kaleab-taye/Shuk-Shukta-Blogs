import Link from 'next/link';

export default function index(props) {
  return (
    <div className="m-auto max-w-contentWid">
      <div className="text-4xl ">bloggers</div>
      {props.bloggers.map((blogger) => (
        <Link key={blogger.id} href={`/bloggers/${blogger.id}`}>
          <div className="m-8">
            <div>username : {blogger.userName}</div>
            <div>firstName :{blogger.firstName}</div>
            <div>lastName : {blogger.lastName}</div>
            <div>no of blogs : {blogger.blogs.length}</div>
          </div>
        </Link>
      ))}
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
