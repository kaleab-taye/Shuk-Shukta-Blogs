import Head from 'next/head';
import icon from '../public/swag-lion.png'

export default function Header( props) {
  let url = process.env.url
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="keywords" content={props.content} />
      <link rel="icon" href={props.icon} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:image" content={`${url}/swag-lion.png`} />

      </Head>
  );
}

Header.defaultProps = {
  title: 'Shuk-Shukta blogs',
  icon: '/favicon.ico',
  content: 'ethiopian blogs, blogging, content writing',
};
