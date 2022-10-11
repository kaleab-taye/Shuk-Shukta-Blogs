import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../../components/Button';
import PageHeading from '../../components/PageHeading';

export default function NewBlog() {
  const router = useRouter();
  const [status, setStatus] = useState('unPublished');
  const [error, setError] = useState('');
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
  // const [author, setAuthor] = useState('');
  // const [blogKey, setBlogKey] = useState('');

  const publishBlog = async (form) => {
    form.preventDefault();
    setStatus('publishing');
    let webUrl = process.env.url;

    let headersList = {
      'Content-Type': 'application/json',
    };

    if (form.target.author.value.length < 1) {
      form.target.author.value = 'Anonymous';
    }

    let bodyContent = JSON.stringify({
      title: form.target.title.value,
      body: form.target.blog.value,
      comment: [],
      blogMeta: {
        seen: 0,
        upVote: 0,
        downVote: 0,
        date: 0,
        comment: 0,
      },
      author: form.target.author.value,
      blogKey: form.target.blogKey.value,
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

  return (
    <div className="sm:my-14">
      <hr />
      <div className="px-6 py-10 m-auto max-w-contentWid 2xl:max-w-contentWidLg">
        <PageHeading
          heading="New Blog"
          className="text-5xl lg:text-6xl xl:text-7xl font-semibold font-commonFont text-accent"
        backTo='/'
          />

        <form onSubmit={(form) => publishBlog(form)}>
          <div className="grid grid-cols-1 gap-6 my-8">
            <div>
              <label htmlFor="title" className="text-onSecondary font-semibold">
                {' '}
                Title*
              </label>
              <input
                id="title"
                // onChange={(e) => {
                //   setTitle(e.value);
                // }}
                required
                minLength={5}
                className="border m-1 p-1 ml-5 w-1/2"
              />
            </div>
            <div>
              <label htmlFor="blog" className="text-onSecondary font-semibold">
                {' '}
                Blog*
              </label>
              <textarea
                id="blog"
                // onChange={(e) => {
                //   setBody(e.value);
                // }}
                required
                minLength={45}
                className="border m-1 p-1 w-full h-80 align-top"
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="text-onSecondary font-semibold"
              >
                {' '}
                Author
              </label>
              <input
                id="author"
                // onChange={(e) => {
                //   setAuthor(e.value);
                // }}

                className="border m-1 p-1 ml-5 w-1/2"
              />
            </div>
            <div>
              <label
                htmlFor="blogKey"
                className="text-onSecondary font-semibold"
              >
                {' '}
                Key* <span className="font-normal">(to edit/delete)</span>
              </label>
              <input
                id="blogKey"
                // onChange={(e) => {
                //   setBlogKey(e.value);
                // }}
                required
                minLength={5}
                className="border m-1 p-1 ml-5 w-1/2"
              />
            </div>
          </div>
          <Button
            placeholder={
              status === 'publishing' ? 'Publishing . . .' : 'Publish'
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
