import { Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import Nav from '../../components/Nav';
import { categoryList } from '../../components/tempData/category';
import BodyLayout from '../../components/Ui/BodyLayout';
import Button_comp from '../../components/Ui/Button_comp';
import ChipSection from '../../components/Ui/section/ChipSection';

export default function NewBlog() {
  const router = useRouter();
  const [status, setStatus] = useState('unPublished');
  const [error, setError] = useState('');

  const [selectedCategoryState, setSelectedCategoryState] = useState([]);

  const [titleContent, setTitleContent] = useState('');
  const [titleContentError, setTitleContentError] = useState('');

  const [blogBodyContent, setBlogBodyContent] = useState('');
  const [blogBodyContentError, setBlogBodyContentError] = useState('');

  const publishingStatusEnum = {
    idl: 'idl',
    publishing: 'publishing',
    success: 'success',
    failed: 'failed',
  };
  const [publishingStatus, setPublishingStatus] = useState(
    publishingStatusEnum.idl
  );

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      console.error(error);
      setError("you're not properly logged if please login again");
      router.replace('/auth/login');
    }
  }, []);

  let blogContentValidation = () => {
    if (document.newBlog.blogContent.value.length === 0) {
      setBlogBodyContentError("*this field can't be empty");
      return false;
    } else if (document.newBlog.blogContent.value.length <= 10) {
      setBlogBodyContentError('*blog must be at least 10 letters');
      return false;
    } else {
      setBlogBodyContentError('');
      return true;
    }
  };

  let titleValidation = () => {
    if (document.newBlog.title.value.length === 0) {
      setTitleContentError("*this field can't be empty");
      return false;
    } else if (document.newBlog.title.value.length <= 5) {
      setTitleContentError('*title must be at least 5 letters');
      return false;
    } else {
      setTitleContentError('');

      return true;
    }
  };

 
  const publishBlog = async (form) => {
    form.preventDefault();
    setError('');
    if (!checkValidity()) {
      console.log('form not valid');
      return;
    }
    setPublishingStatus(publishingStatusEnum.publishing);
    // setStatus('publishing');

    let webUrl = process.env.url;

    let headersList = {
      'Content-Type': 'application/json',
    };

    try {
      var author = JSON.parse(localStorage.getItem('user')).user['_id'];
    } catch (error) {
      setError("you're not properly logged if please login again");
      router.replace('/auth/login');
      return;
      // throw 'user not properly logged in';
    }

    let bodyContent = JSON.stringify({
      title: document.newBlog.title.value,
      body: document.newBlog.blogContent.value,
      category: selectedCategoryState,
      comment: [],
      blogMeta: {
        seen: 0,
        upVote: 0,
        downVote: 0,
        date: 0,
        comment: 0,
      },
      author: author,
    });

    try {
      let response = await fetch(`${webUrl}/api/blogs`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      if (response.status === 200) {
        // setStatus('published');
        setPublishingStatus(publishingStatusEnum.success);
        router.push(`/#${JSON.parse(await response.text()).id}`);
      } else {
        let resp = await response.text();

        setError(`error publishing content ${resp}`);
        // setStatus('unPublished');
        setPublishingStatus(publishingStatusEnum.failed);
      }
    } catch (error) {
      console.error('error', error);
      // setStatus('unPublished');
      setPublishingStatus(publishingStatusEnum.failed);

      setError(`error ${error}`);
    }
  };

  function checkValidity(e) {
    titleValidation();
    blogContentValidation();
    if (titleValidation() && blogContentValidation()) {
      
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="">
      <Nav contentType="notSearchable" />
      <BodyLayout>
        {/* snackbar display start */}
        <div>
          <Snackbar
            open={publishingStatus === publishingStatusEnum.failed}
            autoHideDuration={6000}
            onClose={() => setPublishingStatus(publishingStatusEnum.idl)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="error" sx={{ width: '100%' }}>
              failed to publish blog
            </Alert>
          </Snackbar>
          <Snackbar
            open={publishingStatus === publishingStatusEnum.publishing}
            autoHideDuration={6000}
            // onClose={() => setPublishingStatus(publishingStatusEnum.idl)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="info" sx={{ width: '100%' }}>
              publishing ...
            </Alert>
          </Snackbar>
          <Snackbar
            open={publishingStatus === publishingStatusEnum.success}
            autoHideDuration={6000}
            onClose={() => setPublishingStatus(publishingStatusEnum.idl)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              successfully published
            </Alert>
          </Snackbar>
          <Snackbar
            open={error}
            autoHideDuration={6000}
            // onClose={() => setPublishingStatus(publishingStatusEnum.idl)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </div>
        {/* snackbar display end */}

        <div className="max-w-blogCardWidLg mx-auto grid">
          <div className="font-bold text-onSecondary text-2xl my-8 ml-5">
            New Blog
          </div>
          <form id="newBlog" name="newBlog" onSubmit={(e) => publishBlog(e)}>
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
              <Button_comp>Publish Blog</Button_comp>
            </div>
          </form>
        </div>
      </BodyLayout>
    </div>
  );
}
