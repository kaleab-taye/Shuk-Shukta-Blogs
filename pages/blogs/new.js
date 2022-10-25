import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import PageHeading from '../../components/PageHeading';

export default function NewBlog() {
  const router = useRouter();
  const [status, setStatus] = useState('unPublished');
  const [error, setError] = useState('');

  const [validity, setValidity] = useState('');
  const validityEnum = {
    valid: 'Valid',
    invalid: 'Invalid',
    invalidTitle: 'Invalid title',
    invalidBlogBody: 'Invalid blog',
    invalidBlogKey: 'Invalid blog key',
  };

  const [invalidType, setInvalidType] = useState('');
  const invalidTypeEnum = {
    smallLengthTitle: `set the title to 5 letters minimum`,
    noTitle: "the title field can't be empty",
    none: '',
    noBlogBody: "blog field can't be empty",
    smallBlogBodyLength: 'blog field must be more than 10 words',
    noBlogKey: "key field can't be empty",
    smallBlogKeyLength: 'key field must be more than 5 words',
  };

  useEffect(() => {
    checkSubmissionValidity();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      console.error(error);
      setError("you're not properly logged if please login again");
      router.replace('/auth/login');
    }
  }, []);

  const publishBlog = async (form) => {
    form.preventDefault();

    checkValidity();
    if (validity !== validityEnum.valid) {
      return;
    }
    // await checkValidity();

    setStatus('publishing');
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
      title: form.target.title.value,
      body: form.target.blogBody.value,
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
        setStatus('published');
        router.push(`/#${JSON.parse(await response.text()).id}`);
      } else {
        setError('error publishing content @1 please try again');
        setStatus('unPublished');
      }
    } catch (error) {
      console.error('error', error);
      setStatus('unPublished');
      setError(`error ${error}`);
    }
  };

  function checkSubmissionValidity(e) {
    const form = document.getElementById('newBlogForm');
    const title = document.getElementById('title');
    const blogBody = document.getElementById('blogBody');
    const blogKey = document.getElementById('blogKey');
    // form validation
    form.addEventListener('submit', () => {
      // title
      if (title.value.length === 0) {
        setValidity((a) => validityEnum.invalidTitle);
        setInvalidType((b) => invalidTypeEnum.noTitle);
      } else if (title.value.length < 5) {
        setValidity((a) => validityEnum.invalidTitle);
        setInvalidType((b) => invalidTypeEnum.smallLengthTitle);
      }
      // blog body
      else if (blogBody.value.length === 0) {
        setValidity((a) => validityEnum.invalidBlogBody);
        setInvalidType((b) => invalidTypeEnum.noBlogBody);
      } else if (blogBody.value.length < 10) {
        setValidity((a) => validityEnum.invalidBlogBody);
        setInvalidType((b) => invalidTypeEnum.smallBlogBodyLength);
      }
      // blog key
      // else if (blogKey.value.length === 0) {
      //   setValidity((a) => validityEnum.invalidBlogKey);
      //   setInvalidType((b) => invalidTypeEnum.noBlogKey);
      // } else if (blogKey.value.length < 5) {
      //   setValidity((a) => validityEnum.invalidBlogKey);
      //   setInvalidType((b) => invalidTypeEnum.smallBlogKeyLength);
      // }
      else {
        setValidity((a) => validityEnum.valid);
        setInvalidType((b) => invalidTypeEnum.none);
      }
    });
  }

  function checkValidity(e) {
    const form = document.getElementById('newBlogForm');
    const title = document.getElementById('title');
    const blogBody = document.getElementById('blogBody');
    const blogKey = document.getElementById('blogKey');

    // title validation
    title.addEventListener('input', () => {
      if (title.value.length === 0) {
        setValidity((a) => validityEnum.invalidTitle);
        setInvalidType((b) => invalidTypeEnum.noTitle);
      } else if (title.value.length < 5) {
        setValidity((a) => validityEnum.invalidTitle);
        setInvalidType((b) => invalidTypeEnum.smallLengthTitle);
      } else {
        setValidity((a) => validityEnum.valid);
        setInvalidType((b) => invalidTypeEnum.none);
      }
    });
    // blog body validation
    blogBody.addEventListener('input', () => {
      if (blogBody.value.length === 0) {
        setValidity((a) => validityEnum.invalidBlogBody);
        setInvalidType((b) => invalidTypeEnum.noBlogBody);
      } else if (blogBody.value.length < 10) {
        setValidity((a) => validityEnum.invalidBlogBody);
        setInvalidType((b) => invalidTypeEnum.smallBlogBodyLength);
      } else {
        setValidity((a) => validityEnum.valid);
        setInvalidType((b) => invalidTypeEnum.none);
      }
    });
    // key validation
    // blogKey.addEventListener('input', () => {
    //   if (blogKey.value.length === 0) {
    //     setValidity((a) => validityEnum.invalidBlogKey);
    //     setInvalidType((b) => invalidTypeEnum.noBlogKey);
    //   } else if (blogKey.value.length < 5) {
    //     setValidity((a) => validityEnum.invalidBlogKey);
    //     setInvalidType((b) => invalidTypeEnum.smallBlogKeyLength);
    //   } else {
    //     setValidity((a) => validityEnum.valid);
    //     setInvalidType((b) => invalidTypeEnum.none);
    //   }
    // });

    return false;
  }

  return (
    <div className="sm:my-14">
      <hr />
      <div className="px-6 py-10 m-auto max-w-contentWid 2xl:max-w-contentWidLg">
        <PageHeading
          heading="New Blog"
          className="text-5xl lg:text-6xl xl:text-7xl font-semibold font-commonFont text-accent"
          backTo="/"
        />

        <form id="newBlogForm" onSubmit={(form) => publishBlog(form)}>
          <div className="grid grid-cols-1 gap-6 my-8">
            <div>
              <label htmlFor="title" className="text-onSecondary font-semibold">
                {' '}
                Title*
              </label>
              <input
                id="title"
                className="invalid:border-failure border m-1 p-1 ml-5 w-1/2"
              />{' '}
              <div id="titleError" className="text-failure">
                {validity === validityEnum.invalidTitle ? invalidType : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="blogBody"
                className="text-onSecondary font-semibold"
              >
                {' '}
                Blog*
              </label>
              <textarea
                id="blogBody"
                className="border m-1 p-1 w-full h-80 align-top"
              />
              <div id="blogBodyError" className="text-failure">
                {validity === validityEnum.invalidBlogBody ? invalidType : null}
              </div>
            </div>
            {/* <div>
              <label
                htmlFor="author"
                className="text-onSecondary font-semibold"
              >
                {' '}
                Author
              </label>
              <input id="author" className="border m-1 p-1 ml-5 w-1/2" />
            </div>
            <div>
              <label
                htmlFor="blogKey"
                className="text-onSecondary font-semibold"
              >
                {' '}
                Key* <span className="font-normal">(to edit/delete)</span>
              </label>
              <input id="blogKey" className="border m-1 p-1 ml-5 w-1/2" />
              <div id="blogBodyError" className="text-failure">
                {validity === validityEnum.invalidBlogKey ? invalidType : null}
              </div>
            </div> */}
          </div>
          <Button
            placeholder={
              status === 'publishing' ? 'Publishing . . .' : 'Publish'
            }
            disable={
              status === 'publishing'
                ? true
                : status === 'published'
                ? true
                : null
            }
            type="submit"
          />
          <div className="text-center">
            <div className="inline-flex text-failure">
              {error.length > 1 ? error : null}
              <span className="text-success">
                {status === 'published' ? 'published' : null}
              </span>
            </div>
          </div>
        </form>
      </div>
      <hr />
    </div>
  );
}
