import Link from 'next/link';
import Footer from '../../../../../components/Footer';

export default function index(props) {
  return (
    <>
      <div>
        <div key={props.blog.id}>
          <div>id : {props.blog.id}</div>
          <div>title : {props.blog.title}</div>
        </div>
        <Link
          href={{
            pathname: `/user/${props.userId}/blogs/${props.blog.id}/edit`,
            query: { token: props.token },
          }}
        >
          edit
        </Link>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (context) => {
  let url = process.env.url;
  try {
    let res = await fetch(
      `${url}/api/user/${context.params.id}/blogs/${context.params.blogId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${context.query.token}` },
      }
    );
    let blog = await res.json();
    return {
      props: {
        blog,
        userId: context.params.id,
        token: context.query.token,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
};
