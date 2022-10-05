import Head from 'next/head';
import icon from '../public/swag-lion.png'

export default function Header( props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="keywords" content={props.content} />
      <link rel="icon" href={props.icon} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}

Header.defaultProps = {
  title: 'Shuk-Shukta blogs',
  icon: '/swag-lion.png',
  content: 'ethiopian blogs, blogging, content writing',
};
