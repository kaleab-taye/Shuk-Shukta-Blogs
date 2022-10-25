import { useState } from 'react';
import Footer from '../../../../../components/Footer';

export default function Index(props) {
  const editPageStateEnum = {
    idl: 'idl',
    updatingBlog: 'Updating . . .',
    deletingBlog: 'Deleting . . .',
    success: 'Success',
    failed: 'Failed',
  };
  const [editPageState, setEditPageState] = useState(editPageStateEnum.idl);

  const stateErrorEnum = { idl: 'id' };
  const [stateError, setStateError] = useState(stateErrorEnum.idl);

  const url = process.env.url;

  async function handleEditBlog(form) {
    form.preventDefault();
    setEditPageState(editPageStateEnum.updatingBlog);

    try {
      let bodyContent = JSON.stringify({
        title: form.target.title.value,
        body: form.target.body.value,
      });

      let result = await fetch(
        `${url}/api/user/${props.userId}/blogs/${props.blog.id}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${props.token}` },
          body: bodyContent,
        }
      );
      let res = await result.text();

      if (result.status === 200) {
        setEditPageState(editPageStateEnum.success);
      } else {
        throw res;
      }
    } catch (error) {
      console.error(error);
      setEditPageState(editPageStateEnum.failed);
      setStateError(error);
    }
  }

  async function handleDelete(event){

    setEditPageState(editPageStateEnum.deletingBlog);
    try {
  
        let result = await fetch(
          `${url}/api/user/${props.userId}/blogs/${props.blog.id}`,
          {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${props.token}` },
          }
        );
        let res = await result.text();
  
        if (result.status === 200) {
          setEditPageState(editPageStateEnum.success);
        } else {
          throw res;
        }
      } catch (error) {
        console.error(error);
        setEditPageState(editPageStateEnum.failed);
        setStateError(error);
      }

  }

  return (
    <>
      <div>
        <div>
          <form id="blogEditForm" onSubmit={(e) => handleEditBlog(e)}>
            <div>
              {editPageState !== editPageStateEnum.idl &&
              editPageState !== null
                ? editPageState
                : null}
                <br/>
                {stateError !== stateErrorEnum.idl &&
                    stateError !== null
                      ? stateError
                      : null}
            </div>
            <div>
              title :
              <input id="title" name="title" defaultValue={props.blog.title} />
            </div>{' '}
            <div>
              body :
              <input id="body" name="body" defaultValue={props.blog.body} />
            </div>
            <button type="submit">update</button>
          </form>
          <button onClick={(e)=>handleDelete(e)}>delete</button>
        </div>
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
