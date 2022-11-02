import BlogContextProvider from '../../components/BlogContextProvider';
import Nav from '../../components/Nav';
import Blog_List from '../../components/Ui/Blog-List';

export default function blogger(props) {
  return (
    <div>
      <div className="">
        <BlogContextProvider blogs={props.blogger.blogs}>
          <Nav />
          <Blog_List />
        </BlogContextProvider>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let url = process.env.url;
  try {
    let res = await fetch(`${url}/api/bloggers/${context.params.id}`);
    let blogger = await res.json();
    console.log('bb', blogger);
    return {
      props: {
        blogger,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
