import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InputField from '../../../../../components/InputField';
import Nav from '../../../../../components/Nav';
import { categoryList } from '../../../../../components/tempData/category';
import BodyLayout from '../../../../../components/Ui/BodyLayout';
import Button_comp from '../../../../../components/Ui/Button_comp';
import ChipSection from '../../../../../components/Ui/section/ChipSection';

export default function Index({ blog, token, userId }) {
  const router = useRouter();

  const [selectedCategoryState, setSelectedCategoryState] = useState([]);
  
  const [titleContent, setTitleContent] = useState('');
  const [titleContentError, setTitleContentError] = useState('');

  const [blogBodyContent, setBlogBodyContent] = useState('');
  const [blogBodyContentError, setBlogBodyContentError] = useState('');

  const editPageStateEnum = {
    idl: 'idl',
    updatingBlog: 'Updating . . .',
    deletingBlog: 'Deleting . . .',
    success: 'Success',
    failed: 'Failed',
  };
  const [editPageState, setEditPageState] = useState(editPageStateEnum.idl);

  const editStateEnum = {
    idl: 'idl',
    editing: 'editing blog . . .',
    failed: 'editing blog failed',
    success: 'success',
  };
  const [editState, setEditState] = useState(editStateEnum.idl);

  const deleteStateEnum = {
    idl: 'idl',
    deleting: 'deleting blog . . .',
    failed: 'deleting blog failed',
    success: 'success',
  };
  const [deleteState, setDeleteState] = useState(deleteStateEnum.idl);

  const stateErrorEnum = { idl: 'id' };
  const [error, setError] = useState('');

  const url = process.env.url;

  async function handleEditBlog(form) {
    form.preventDefault();
    if (!checkValidity()) {
      console.log('form not valid');
      return;
    }
    setEditState(editStateEnum.editing);

    try {
      let bodyContent = JSON.stringify({
        title: document.editBlog.title.value,
        body: document.editBlog.blogContent.value,
        category: selectedCategoryState,
      });

      let result = await fetch(`${url}/api/user/${userId}/blogs/${blog.id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: bodyContent,
      });

      if (result.status === 200) {
        setEditState(editStateEnum.success);
        router.push({
          pathname: `/user/${userId}/blogs/${blog.id}`,
          query: { token },
        });
      } else {
        let res = await result.text();
        throw res;
      }
    } catch (error) {
      console.error(error);
      setEditState(editStateEnum.failed);
      setError(error);
    }
  }

  async function handleDelete(event) {
    setDeleteState(deleteStateEnum.deleting);
    try {
      let result = await fetch(`${url}/api/user/${userId}/blogs/${blog.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      let res = await result.text();

      if (result.status === 200) {
        setDeleteState(deleteStateEnum.success);
        router.push({ pathname: `/user/${userId}/blogs`,query:{token} });
      } else {
        throw res;
      }
    } catch (error) {
      console.error(error);
      setDeleteState(deleteStateEnum.failed);
      setError(error.toString());       
    }
  }
  function checkValidity(e) {
    titleValidation();
    blogContentValidation();
    if (titleValidation() && blogContentValidation()) {
      return true;
    } else {
      return false;
    }
  }
  let blogContentValidation = () => {
    if (document.editBlog.blogContent.value.length === 0) {
      setBlogBodyContentError("*this field can't be empty");
      return false;
    } else if (document.editBlog.blogContent.value.length <= 10) {
      setBlogBodyContentError('*blog must be at least 10 letters');
      return false;
    } else {
      setBlogBodyContentError('');
      return true;
    }
  };

  let titleValidation = () => {
    if (document.editBlog.title.value.length === 0) {
      setTitleContentError("*this field can't be empty");
      return false;
    } else if (document.editBlog.title.value.length <= 5) {
      setTitleContentError('*title must be at least 5 letters');
      return false;
    } else {
      setTitleContentError('');

      return true;
    }
  };

  useEffect(() => {
    document.getElementById('title').value = blog.title;
    document.getElementById('blogContent').value = blog.body;
    setSelectedCategoryState(blog.category);
  }, []);
  return (
    <>
      <div className="">
        <Nav contentType="notSearchable" />
        <BodyLayout>
          {/* snackbar display start */}
          <div>
            {/* edit state start */}
            <Snackbar
              open={error.length > 0 ? true : false}
              autoHideDuration={6000}
              onClose={() => setError('')}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>
            <Snackbar
              open={error.length < 1 && editState === editStateEnum.failed}
              autoHideDuration={6000}
              onClose={() => setEditState(editStateEnum.idl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="error" sx={{ width: '100%' }}>
                {editState}
              </Alert>
            </Snackbar>
            <Snackbar
              open={error.length < 1 && editState === editStateEnum.success}
              autoHideDuration={6000}
              onClose={() => setEditState(editStateEnum.idl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="success" sx={{ width: '100%' }}>
                {editState}
              </Alert>
            </Snackbar>
            <Snackbar
              open={error.length < 1 && editState === editStateEnum.editing}
              autoHideDuration={6000}
              // onClose={() => setEditState(editStateEnum.idl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="info" sx={{ width: '100%' }}>
                {editState}
              </Alert>
            </Snackbar>
            {/* delete state start */}
            <Snackbar
              open={error.length < 1 && deleteState === deleteStateEnum.failed}
              autoHideDuration={6000}
              onClose={() => setDeleteState(deleteStateEnum.idl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="error" sx={{ width: '100%' }}>
                {deleteState}
              </Alert>
            </Snackbar>
            <Snackbar
              open={error.length < 1 && deleteState === deleteStateEnum.success}
              autoHideDuration={6000}
              onClose={() => setDeleteState(deleteStateEnum.idl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="success" sx={{ width: '100%' }}>
                {deleteState}
              </Alert>
            </Snackbar>
            <Snackbar
              open={
                error.length < 1 && deleteState === deleteStateEnum.deleting
              }
              autoHideDuration={6000}
              // onClose={() => setDeleteState(deleteStateEnum.idl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="info" sx={{ width: '100%' }}>
                {deleteState}
              </Alert>
            </Snackbar>
          </div>
          {/* snackbar display end */}

          <div className="max-w-blogCardWidLg mx-auto grid">
            <div className="font-bold text-onSecondary text-2xl my-8 ml-5">
              Edit Blog
            </div>
            <form
              id="editBlog"
              name="editBlog"
              onSubmit={(e) => handleEditBlog(e)}
            >
              <div className="grid gap-5 py-10 px-5 border border-secondary rounded-md">
                <div className="grid gap-1 grid-flow-row">
                  <div className="text-sm text-textColor3">Title</div>
                  <div className="w-full grid">
                    <InputField
                      errorState={titleContentError}
                      className="w-full"
                      id="title"
                      onChangeSetterState={titleValidation}
                    />
                  </div>
                </div>
                <div className="grid gap-1 grid-flow-row">
                  <div className="text-sm text-textColor3">Body</div>
                  <div className="w-full grid grid-cols-1">
                    <textarea
                      id="blogContent"
                      onChange={(e) => blogContentValidation()}
                      className=" border border-secondary rounded py-1 px-3 text-sm w-full h-48"
                    />
                    <span className="pt-1 mr-auto text-failure text-xs col-span-5">
                      {blogBodyContentError.length > 1
                        ? blogBodyContentError
                        : null}
                    </span>
                  </div>
                </div>
                <div className="grid gap-1 grid-flow-row">
                  <div className="text-sm text-textColor3">Category</div>
                  <ChipSection
                    options={categoryList}
                    selectedSetter={setSelectedCategoryState}
                    selected={selectedCategoryState}
                  />
                </div>
                <Button_comp>Update Blog</Button_comp>
                <div className="w-full border-b border-secondary"></div>

                <div
                  onClick={(e) => handleDelete(e)}
                  className="cursor-pointer text-danger  grid grid-flow-col mr-auto gap-2  text-sm"
                >
                  <FontAwesomeIcon
                    className="w-5 h-5 my-auto"
                    icon={faTrashCan}
                  />{' '}
                  <div className="my-auto">delete blog</div>
                </div>
              </div>
            </form>
          </div>
        </BodyLayout>
      </div>
      <div>
        {/* <div>
          <form id="blogEditForm" onSubmit={(e) => handleEditBlog(e)}>
            <div>
              {editPageState !== editPageStateEnum.idl && editPageState !== null
                ? editPageState
                : null}
              <br />
              {stateError !== stateErrorEnum.idl && stateError !== null
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
          <button onClick={(e) => handleDelete(e)}>delete</button>
        </div> */}
      </div>
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
