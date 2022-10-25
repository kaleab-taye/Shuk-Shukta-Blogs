export default function blogger(props) {
  return (
    <div>
      <div>userName {props.blogger.userName}</div>
      <div>firstName {props.blogger.firstName}</div>
      <div>lastName {props.blogger.lastName}</div>
      <div>joinedDate {props.blogger.joinedDate}</div>
      <div>id {props.blogger.id}</div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let url = process.env.url;
  try {
    let res = await fetch(`${url}/api/bloggers/${context.params.id}`);
    let blogger = await res.json();
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
