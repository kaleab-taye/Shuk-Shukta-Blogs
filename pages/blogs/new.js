import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../../components/Button';

export default function NewBlog() {


  const router = useRouter()
  const [status, setStatus] = useState('unPublished');
  const [error, setError] = useState('mm');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  const publishBlog = async (form) => {
    form.preventDefault();
    let webUrl = process.env.url;

    let headersList = {
      'Content-Type': 'application/json',
    };

    // if(form.target.title.value.length<1){

    //   setError('the fie')
    //   return;
    // }


    let bodyContent = JSON.stringify({
      title: form.target.title.value,
      body: form.target.blog.value,
      comment: [],
      blogMeta: {
        author: form.target.author.value,
        seen: 0,
        upVote: 0,
        downVote: 0,
        date: 0,
        comment: 0,
      },
    });


    try {
      let response = await fetch(`${webUrl}/api/blogs`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      if (response.status === 200) {
        setStatus('published');
        console.log('200d')
        router.push('/')
      } else {
        setStatus('unPublished');
      }
    } catch (error) {
      console.log(error);
      setStatus('unPublished');
      setError(error);
    }
  };

  return (
    <div className="my-14">
      <hr />
      <div className="px-6 py-10 m-auto max-w-contentWid">
        <div className="text-5xl lg:text-6xl xl:text-7xl font-semibold font-commonFont text-accent">
          New Blog
        </div>
        <form onSubmit={(form) => publishBlog(form)}>
          <div className="grid grid-cols-1 gap-6 my-8">
            <div>
              <label for="title" className="text-onSecondary font-semibold">
                {' '}
                Title*
              </label>
              <input
                id="title"
                onChange={(e) => {
                  setTitle(e.value);
                }}
                required
                minLength={5}
                className="border m-1 p-1 ml-5 w-1/2"
              />
            </div>
            <div>
              <label for="blog" className="text-onSecondary font-semibold">
                {' '}
                Blog*
              </label>
              <textarea
                id="blog"
                onChange={(e) => {
                  setBody(e.value);
                }}
                required
                minLength={45}
                className="border m-1 p-1 w-full h-80 align-top"
              />
            </div>
            <div>
              <label for="author" className="text-onSecondary font-semibold">
                {' '}
                Author
              </label>
              <input
                id="author"
                onChange={(e) => {
                  setAuthor(e.value);
                }}
                className="border m-1 p-1 ml-5 w-1/2"
              />
            </div>
          </div>
          <Button placeholder="Publish" type="submit" />
          <div>
          {error.length>1 ? error : null}
          </div>
        </form>
        <div>{status === 'published' ? 'published' : null}</div>
      </div>
      <hr />
    </div>
  );
}
