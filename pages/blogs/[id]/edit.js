import { useEffect, useState } from 'react';
import Button from '../../../components/Button';

export default function EditBlog(props) {
  const [title, setTitle] = useState(props.blog.title);
  const [body, setBody] = useState(props.blog.body);
  const [author, setAuthor] = useState(props.blog.blogMeta.author);

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function publishUpdate(form) {
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
    });

    try {
      let response = await fetch(`${webUrl}/api/blogs/${props.blog.id}`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      if (response.status === 200) {
        setStatus('published');
        router.push('/');
      } else {
        setError('error publishing content @1 please try again');
        setStatus('unPublished');
      }
    } catch (error) {
      console.log('error', error);
      setStatus('unPublished');
      setError(`error ${error}`);
    }
  }
  return (
    <div className="px-6 py-10 m-auto max-w-contentWid">
      <div className="text-5xl lg:text-6xl xl:text-7xl font-semibold font-commonFont text-accent">
        Edit Blog
      </div>
      <form onSubmit={(e) => publishUpdate(e)}>
        <div className="grid grid-cols-1 gap-6 my-8">
          <div>
            <label for="title" className="text-onSecondary font-semibold">
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
            <label for="blog" className="text-onSecondary font-semibold">
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
            <label for="author" className="text-onSecondary font-semibold">
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
        </div>
        <div className="text-failure">
        {error.length > 1 ? error : null}
        {status === 'published' ? 'Published' : null}
        </div>
        <Button
          type="submit"
          placeholder={status === 'publishing' ? 'Publishing . . .' : 'Publish'}
        />
      </form>
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
