import Link from 'next/link';
import Footer from '../../../../components/Footer';

export default function index(props) {
    console.log(props.blogs)
  return (
    <>
      <div>
        {props.blogs.map((blog) => (blog !==null ?
          <div key={blog.id}>
            <Link
              href={{
                pathname: `/user/${props.userId}/blogs/${blog.id}`,
                query: { token: props.token },
              }}
            >
              <a>
                <div>id : {blog.id}</div>
                <div>title : {blog.title}</div>
              </a>
            </Link>
          </div>:null
        ))}
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (context) => {
  let url = process.env.url;
  try {
    let res = await fetch(`${url}/api/user/${context.params.id}/blogs`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${context.query.token}` },
    });
    let blogs = await res.json();
    return {
      props: {
        blogs,
        userId: context.params.id,
        token: context.query.token,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        notFound : true,
        error: error,
      },
    };
  }
};
