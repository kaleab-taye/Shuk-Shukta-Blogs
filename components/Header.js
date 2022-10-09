import Head from 'next/head';
import icon from '../public/swag-lion.png';

export default function Header(props) {
  let url = process.env.url;
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="keywords" content={props.content} />
      <link rel="icon" href={props.icon} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:image" content={`${url}/swag-lion.png`} />
      <meta property="og:title" content={props.title} />
      <meta property="og:type" content={props.type} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image:width" content="2400" />
      <meta property="og:image:height" content="1260" />
    </Head>
  );
}

Header.defaultProps = {
  title: 'Shuk-Shukta blogs',
  icon: '/favicon.ico',
  content: 'ethiopian blogs, blogging, content writing',
  type: 'article',
  description:
    'A free blogging site where anyone can share their ideas, get the chance to comment and discuss on points they would be interested in.',
};
