import { useRouter } from 'next/router';
import { useState } from 'react';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import PageHeading from '../../../components/PageHeading';

export default function EditBlog(props) {
  const webUrl = process.env.url;
  const router = useRouter();

  const [title, setTitle] = useState(props.blog.title);
  const [body, setBody] = useState(props.blog.body);
  const [author, setAuthor] = useState(props.blog.author);
  const [blogKey, setBlogKey] = useState('***');

  const [status, setStatus] = useState('');
  const statusEnum = {
    deleting: 'Deleting . . .',
    publishing: 'Publishing . . .',
    deleted: 'Deleted',
    published: 'Published',
    notDeleted: 'Failed to delete',
    notPublished: 'Failed to publish',
  };
  const [error, setError] = useState('');

  async function deleteBlog() {
    setStatus(statusEnum.deleting);
    try {
      let headersList = {
        'Content-Type': 'application/json',
      };

      let bodyContent = JSON.stringify({
        key: props.blog.blogKey,
      });
      let response = await fetch(`${webUrl}/api/blogs/${props.blog.id}`, {
        method: 'DELETE',
        body: bodyContent,
        headers: headersList,
      });
      if (response.status === 200) {
        setStatus(statusEnum.deleted);
        router.push(`/`);
      } else {
        // setError('error publishing content @1 please try again');
        // setStatus('unPublished');
        throw `deleting failed ${response}`;
      }
    } catch (error) {
      console.error('error', error);
      setStatus(statusEnum.notDeleted);
      setError(`error ${error}`);
    }
  }
  async function publishUpdate(form) {
    form.preventDefault();
    setStatus(statusEnum.publishing);

    let headersList = {
      'Content-Type': 'application/json',
    };

    //checks if name is filled and add anonymous in not
    if (form.target.author.value.length < 1) {
      form.target.author.value = 'Anonymous';
    }

    //checks if the blog key is changed & include it in request
    if (blogKey === '***') {
      var bodyContent = JSON.stringify({
        title: form.target.title.value,
        body: form.target.blog.value,
        author: form.target.author.value,
      });
    } else {
      var bodyContent = JSON.stringify({
        title: form.target.title.value,
        body: form.target.blog.value,
        author: form.target.author.value,
        blogKey: form.target.blogKey.value,
      });
    }

    try {
      let response = await fetch(`${webUrl}/api/blogs/${props.blog.id}/edit`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });
      if (response.status === 200) {
        setStatus(statusEnum.published);
        router.push(`/#${props.blog.id}`);
      } else {
        setError('error publishing content @1 please try again');
        setStatus(statusEnum.notPublished);
      }
    } catch (error) {
      console.error('error', error);
      setStatus(statusEnum.notPublished);
      setError(`error ${error}`);
    }
  }
  return (
    <div className="sm:my-14">
      <hr />
      <div className="px-6 py-10 m-auto max-w-contentWid 2xl:max-w-contentWidLg">
        <PageHeading
          heading="Edit Blog"
          backTo={`/blogs/${props.blog.id}`}
          className="text-5xl lg:text-6xl xl:text-7xl font-semibold font-commonFont text-accent"
        />
        <form onSubmit={(e) => publishUpdate(e)}>
          <div className="grid grid-cols-1 gap-6 my-8">
            <div>
              <label htmlFor="title" className="text-onSecondary font-semibold">
                {' '}
                Title
              </label>
              <input
                id="title"
                className="border m-1 p-1 ml-5 w-1/2"
                value={title}
                onChange={(v) => setTitle(v.value)}
              />
            </div>
            <div>
              <label htmlFor="blog" className="text-onSecondary font-semibold">
                {' '}
                Blog
              </label>
              <textarea
                id="blog"
                className="border m-1 p-1 w-full h-80 align-top"
                value={body}
                onChange={(v) => setBody(v.value)}
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
                className="border m-1 p-1 ml-5 w-1/2"
                value={author}
                onChange={(v) => setAuthor(v.value)}
              />
            </div>
            <div>
              <label
                htmlFor="blogKey"
                className="text-onSecondary font-semibold"
              >
                {' '}
                Key
              </label>
              <input
                id="blogKey"
                className="border m-1 p-1 ml-5 w-1/2"
                value={blogKey}
                onChange={(v) => setBlogKey(v.value)}
              />
            </div>
          </div>
          <div>
            <div className="text-failure">
              {status === 'notDeleted' || status === 'unpublished'
                ? 'Failed'
                : ''}
              {error.length > 1 ? error : null}
            </div>
            <br />
            <div className="text-success">{status !== '' ? status : ''}</div>
          </div>
          <Button
            type="submit"
            disabled={status !== '' ? true : false}
            placeholder={
              status === statusEnum.publishing
                ? statusEnum.publishing
                : 'Publish'
            }
          />
        </form>
        <Button
          onClick={() => deleteBlog()}
          className="mt-5"
          background={'bg-failure'}
          placeholder={
            status === statusEnum.deleting ? statusEnum.deleting : 'Delete'
          }
        />
      </div>
      <hr />
    </div>
  );
}

export async function getServerSideProps(context) {
  let url = process.env.url;

  let res = await fetch(`${url}/api/blogs/${context.params.id}`);
  let blog = await res.json();

  return {
    props: {
      blog,
    },
  };
}
