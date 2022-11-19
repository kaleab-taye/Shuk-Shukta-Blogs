import Link from 'next/link';
import BlogContextProvider from '../../../../components/BlogContextProvider';
import Nav from '../../../../components/Nav';
import Blog_List from '../../../../components/Ui/Blog-List';
import My_Blog_List from '../../../../components/Ui/My-Blogs-list';

export default function index(props) {
  console.log('vv',props.blogs);
  return (
    <>
      <div className="">
        <BlogContextProvider blogs={props.blogs}>

          <Nav />
          <My_Blog_List userId={props.userId} token={props.token} />
        </BlogContextProvider>
        {/* <Footer /> */}
      </div>
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
        notFound: true,
        error: error,
      },
    };
  }
};
